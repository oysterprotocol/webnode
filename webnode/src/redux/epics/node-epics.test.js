import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toArray";

import { ActionsObservable, combineEpics } from "redux-observable";
import configureMockStore from "redux-mock-store";

import nodeActions from "../actions/node-actions";
import treasureHuntActions from "../actions/treasure-hunt-actions";
import nodeEpics from "./node-epics";
import nodeSelectors from "../selectors/node-selectors";

import { SECTOR_STATUS } from "../../config";

const { UNCLAIMED, SEARCHING, TREASURE_FOUND, CLAIMED } = SECTOR_STATUS;

const mockStore = configureMockStore([]);

test("registerWebnodeEpic", () => {
  const lastResetAt = new Date();
  const state = {
    node: {
      brokerNodes: [],
      newGenesisHashes: [
        {
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: UNCLAIMED }]
        },
        {
          genesisHash: "genesisHash 2",
          sectorIdx: 2,
          sectors: [{ index: 22, status: SEARCHING }]
        },
        {
          genesisHash: "genesisHash 3",
          sectorIdx: 3,
          sectors: [{ index: 33, status: TREASURE_FOUND }]
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
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: UNCLAIMED }]
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
          genesisHash: "genesisHash bad",
          sectorIdx: 4,
          sectors: [{ index: 44, status: CLAIMED }]
        },
        {
          genesisHash: "genesisHash 1",
          sectorIdx: 1,
          sectors: [{ index: 11, status: UNCLAIMED }]
        },
        {
          genesisHash: "genesisHash 2",
          sectorIdx: 2,
          sectors: [{ index: 22, status: SEARCHING }]
        },
        {
          genesisHash: "genesisHash 3",
          sectorIdx: 3,
          sectors: [{ index: 33, status: TREASURE_FOUND }]
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
  const { index } = treasureHuntableSector;

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        nodeActions.resumeOrStartNewSector({
          genesisHash: genesisHash,
          numberOfChunks: numberOfChunks,
          sectorIdx: index
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
    treasureHunt: { sectorIdx: 1, chunkIdx: 1 }
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

test("markSectorAsClaimedEpic", () => {
  let state = {};

  let store = mockStore(state);

  const action = ActionsObservable.of({
    type: nodeActions.NODE_MARK_SECTOR_AS_CLAIMED
  });

  nodeEpics(action, store)
    .toArray()
    .subscribe(actions => {
      expect(actions).toEqual([
        {"type": nodeActions.NODE_DETERMINE_GENESIS_HASH_OR_TREASURE_HUNT}
      ]);
    });
});
