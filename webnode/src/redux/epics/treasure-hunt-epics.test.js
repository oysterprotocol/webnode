import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toArray";

import { ActionsObservable, combineEpics } from "redux-observable";
import configureMockStore from "redux-mock-store";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import treasureHuntEpics from "./treasure-hunt-epics";

import { CHUNKS_PER_SECTOR } from "../../config/";

import util from "node-forge/lib/util";

import Datamap from "datamap-generator";

const mockStore = configureMockStore([]);

test("performPowEpic", () => {
  const dataMapHash = "datamap";
  const treasure = "treaure";
  const chunkIdx = 1;
  let state = {
    treasureHunt: {
      dataMapHash: dataMapHash,
      treasure: treasure,
      chunkIdx: chunkIdx
    }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: treasureHuntActions.TREASURE_HUNT_PERFORM_POW
  });

  const hashInBytes = util.hexToBytes(dataMapHash);
  const [obfuscatedHash, nextDataMapHash] = Datamap.hashChain(hashInBytes);

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        treasureHuntActions.incrementChunk({
          nextChunkIdx: chunkIdx + 1,
          nextDataMapHash: util.bytesToHex(nextDataMapHash)
        })
      ]);
    });

  state = {
    treasureHunt: {
      dataMapHash: dataMapHash,
      chunkIdx: chunkIdx
    }
  };

  store = mockStore(state);

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        treasureHuntActions.findTreasure({
          dataMapHash,
          chunkIdx
        })
      ]);
    });
});

test("findTreasureEpic", () => {
  const dataMapHash = "datamap";
  const chunkIdx = 1;
  const state = {};

  const store = mockStore(state);

  const action = ActionsObservable.of({
    type: treasureHuntActions.TREASURE_HUNT_FIND_TREASURE,
    payload: { dataMapHash: dataMapHash, chunkIdx: chunkIdx }
  });

  const hashInBytes = util.hexToBytes(dataMapHash);
  const [obfuscatedHash, nextDataMapHashInBytes] = Datamap.hashChain(
    hashInBytes
  );
  const nextDataMapHash = util.bytesToHex(nextDataMapHashInBytes);

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        treasureHuntActions.incrementChunk({
          nextChunkIdx: chunkIdx + 1,
          nextDataMapHash
        })
      ]);
    });
});

test("nextChunkEpic", () => {
  const treasure = "datamap";
  const genesisHash = "genesisHash";
  const numberOfChunks = 11;
  let chunkIdx = 12;
  const sectorIdx = 1;
  const ethAddress = "ethAddress";
  let state = {
    treasureHunt: {
      treasure: treasure,
      genesisHash: genesisHash,
      chunkIdx: chunkIdx,
      numberOfChunks: numberOfChunks,
      sectorIdx: sectorIdx
    },
    node: { ethAddress: ethAddress }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: treasureHuntActions.TREASURE_HUNT_START_SECTOR
  });

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        treasureHuntActions.claimTreasure({
          genesisHash,
          numberOfChunks,
          receiverEthAddr: ethAddress,
          sectorIdx,
          treasure
        })
      ]);
    });

  chunkIdx = 1;

  state = {
    treasureHunt: {
      treasure: treasure,
      genesisHash: genesisHash,
      chunkIdx: chunkIdx,
      numberOfChunks: numberOfChunks,
      sectorIdx: sectorIdx
    },
    node: { ethAddress: ethAddress }
  };

  store = mockStore(state);

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([treasureHuntActions.performPow()]);
    });
});

test("claimTreasureEpic", () => {
  const treasure = "datamap";
  const genesisHash = "genesisHash";
  const numberOfChunks = 11;
  const sectorIdx = 1;
  const receiverEthAddr = "ethAddress";
  const state = {};

  const store = mockStore(state);

  const action = ActionsObservable.of({
    type: treasureHuntActions.TREASURE_HUNT_CLAIM_TREASURE,
    payload: {
      receiverEthAddr: receiverEthAddr,
      genesisHash: genesisHash,
      numberOfChunks: numberOfChunks,
      sectorIdx: sectorIdx,
      treasure: treasure
    }
  });

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        treasureHuntActions.claimTreasureSuccess({ genesisHash, sectorIdx })
      ]);
    });
});

test("completeSectorEpic", () => {
  const genesisHash = "genesisHash";
  const sectorIdx = 1;
  const state = {};

  const store = mockStore(state);

  const action = ActionsObservable.of({
    type: treasureHuntActions.TREASURE_HUNT_CLAIM_TREASURE_SUCCESS,
    payload: {
      genesisHash: genesisHash,
      sectorIdx: sectorIdx
    }
  });

  treasureHuntEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.markSectorAsClaimed({ genesisHash, sectorIdx })
      ]);
    });
});
