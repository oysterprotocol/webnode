import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toArray";

import { ActionsObservable } from "redux-observable";
import configureMockStore from "redux-mock-store";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeEpics from "./node-epics";
import nodeSelectors from "../selectors/node-selectors";

import { SECTOR_STATUS } from "../../config";

const { UNCLAIMED, CLAIMED } = SECTOR_STATUS;

const mockStore = configureMockStore([]);

test("registerWebnodeEpic", () => {
  const lastResetAt = new Date();
  const state = {
    node: {
      brokerNodes: [],
      newGenesisHashes: [
        {
          genesisHash: "claimed 1",
          sectors: [CLAIMED]
        },
        {
          genesisHash: "unclaimed 1",
          sectors: [UNCLAIMED]
        },
        {
          genesisHash: "claimed 2",
          sectors: [CLAIMED]
        }
      ],
      oldGenesisHashes: [],
      id: 11,
      lastResetAt: lastResetAt
    }
  };

  const store = mockStore(state);

  const action = ActionsObservable.of({ type: nodeActions.NODE_INITIALIZE });

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([nodeActions.determineBrokerNodeOrGenesisHash()]);
    });
});

test("brokerNodeOrGenesisHashEpic", () => {
  let state = {
    node: {
      brokerNodes: []
    }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_DETERMINE_BROKER_NODE_OR_GENESIS_HASH
  });

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([nodeActions.requestBrokerNodes()]);
    });

  state = {
    node: {
      brokerNodes: [
        {
          genesisHash: "claimed 1",
          sectors: [CLAIMED]
        },
        {
          genesisHash: "unclaimed 1",
          sectors: [UNCLAIMED]
        }
      ]
    }
  };

  store = mockStore(state);

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.determineGenesisHashOrTreasureHunt()
      ]);
    });
});

test("genesisHashOrTreasureHuntEpic", () => {
  const lastResetAt = new Date();
  let state = {
    node: {
      brokerNodes: [],
      newGenesisHashes: [
        {
          genesisHash: "claimed 1",
          sectors: [CLAIMED]
        },
        {
          genesisHash: "unclaimed 1",
          sectors: [UNCLAIMED]
        },
        {
          genesisHash: "claimed 2",
          sectors: [CLAIMED]
        }
      ],
      oldGenesisHashes: [],
      id: 11,
      lastResetAt: lastResetAt
    }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT
  });

  const treasureHuntableGenesisHash = nodeSelectors.treasureHuntableGenesisHash(
    store.getState()
  );

  const treasureHuntableSector = nodeSelectors.treasureHuntableSector(
    store.getState()
  );

  const { genesisHash, numberOfChunks } = treasureHuntableGenesisHash;
  const sectorIdx = treasureHuntableSector;

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.resumeOrStartNewSector({
          genesisHash,
          numberOfChunks,
          sectorIdx
        })
      ]);
    });

  state = {
    node: {
      newGenesisHashes: []
    }
  };

  store = mockStore(state);

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([nodeActions.requestGenesisHashes()]);
    });
});

test("resumeOrStartNewSectorEpic", () => {
  let state = {
    treasureHunt: { sectorIdx: 1, chunkIdx: 2000000, genesisHash: "hash" }
  };

  let store = mockStore(state);

  const genesisHash = "hash";
  const numberOfChunks = 11;
  const sectorIdx = 1;

  const action = ActionsObservable.of({
    type: nodeActions.NODE_RESUME_OR_START_NEW_SECTOR,
    payload: {
      genesisHash: genesisHash,
      numberOfChunks: numberOfChunks,
      sectorIdx: sectorIdx
    }
  });

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([treasureHuntActions.performPow()]);
    });

  state = {
    treasureHunt: {
      sectorIdx: 1,
      chunkIdx: 1,
      genesisHash: "somethingDifferent"
    }
  };

  store = mockStore(state);

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.checkIfSectorClaimed({
          genesisHash,
          numberOfChunks,
          sectorIdx
        })
      ]);
    });
});

test("requestBrokerEpic", () => {
  let state = {
    node: {
      brokerNodes: [{ genesisHash: "aa" }, { genesisHash: "b" }]
    }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_REQUEST_BROKER_NODES
  });

  const address = "";

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.addBrokerNode({ address }),
        nodeActions.determineBrokerNodeOrGenesisHash()
      ]);
    });
});

test("requestGenesisHashEpic", () => {
  let state = {
    node: {
      brokerNodes: [{ address: "aa" }, { address: "b" }],
      newGenesisHashes: [{ address: "aa" }, { address: "b" }]
    }
  };

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_REQUEST_GENESIS_HASHES
  });

  const genesisHash = "";
  const numberOfChunks = "";

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.addNewGenesisHash({
          genesisHash,
          numberOfChunks
        }),
        nodeActions.determineGenesisHashOrTreasureHunt()
      ]);
    });
});

test("updateSectorStatusEpic", () => {
  let state = {};

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_UPDATE_SECTOR_STATUS
  });

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        { type: nodeActions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT }
      ]);
    });
});
