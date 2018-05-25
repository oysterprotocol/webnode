import actions from "./treasure-hunt-actions";

test("treaure-hunt--action TREASURE_HUNT_START_SECTOR", () => {
  const dataMapHash = "dataMapHash";
  const message = "message";
  const genesisHash = "genesisHash";
  const sectorIdx = 1;
  const numberOfChunks = 11;
  const expected = {
    type: actions.TREASURE_HUNT_START_SECTOR,
    payload: {
      dataMapHash: dataMapHash,
      message: message,
      genesisHash: genesisHash,
      sectorIdx: sectorIdx,
      numberOfChunks: numberOfChunks
    }
  };
  expect(
    actions.startSector({
      dataMapHash,
      message,
      genesisHash,
      sectorIdx,
      numberOfChunks
    })
  ).toEqual(expected);
});

test("treaure-hunt-action TREASURE_HUNT_PERFORM_POW", () => {
  const expected = {
    type: actions.TREASURE_HUNT_PERFORM_POW
  };
  expect(actions.performPow()).toEqual(expected);
});

test("treaure-hunt--action TREASURE_HUNT_FIND_TREASURE", () => {
  const dataMapHash = "dataMapHash";
  const chunkIdx = 11;
  const expected = {
    type: actions.TREASURE_HUNT_FIND_TREASURE,
    payload: {
      dataMapHash: dataMapHash,
      chunkIdx: chunkIdx
    }
  };
  expect(actions.findTreasure({ dataMapHash, chunkIdx })).toEqual(expected);
});

test("treaure-hunt--action TREASURE_HUNT_SAVE_TREASURE", () => {
  const treasure = "treasure";
  const nextChunkIdx = "nextChunkIdx";
  const nextDataMapHash = "nextDataMapHash";
  const expected = {
    type: actions.TREASURE_HUNT_SAVE_TREASURE,
    payload: {
      treasure: treasure,
      nextChunkIdx: nextChunkIdx,
      nextDataMapHash: nextDataMapHash
    }
  };
  expect(
    actions.saveTreasure({ treasure, nextChunkIdx, nextDataMapHash })
  ).toEqual(expected);
});

test("treaure-hunt--action TREASURE_HUNT_INCREMENT_CHUNK", () => {
  const nextChunkIdx = "nextChunkIdx";
  const nextDataMapHash = "nextDataMapHash";
  const expected = {
    type: actions.TREASURE_HUNT_INCREMENT_CHUNK,
    payload: {
      nextChunkIdx: nextChunkIdx,
      nextDataMapHash: nextDataMapHash
    }
  };
  expect(actions.incrementChunk({ nextChunkIdx, nextDataMapHash })).toEqual(
    expected
  );
});

test("treaure-hunt--action TREASURE_HUNT_CLAIM_TREASURE", () => {
  const treasure = "treasure";
  const genesisHash = "genesisHash";
  const numberOfChunks = 11;
  const receiverEthAddr = "receiverEthAddr";
  const sectorIdx = 11;
  const expected = {
    type: actions.TREASURE_HUNT_CLAIM_TREASURE,
    payload: {
      treasure: treasure,
      genesisHash: genesisHash,
      numberOfChunks: numberOfChunks,
      receiverEthAddr: receiverEthAddr,
      sectorIdx: sectorIdx
    }
  };
  expect(
    actions.claimTreasure({
      treasure,
      genesisHash,
      numberOfChunks,
      receiverEthAddr,
      sectorIdx
    })
  ).toEqual(expected);
});

test("treaure-hunt--action TREASURE_HUNT_CLAIM_TREASURE_SUCCESS", () => {
  const genesisHash = "genesisHash";
  const sectorIdx = 2;
  const expected = {
    type: actions.TREASURE_HUNT_CLAIM_TREASURE_SUCCESS,
    payload: {
      genesisHash: genesisHash,
      sectorIdx: sectorIdx
    }
  };
  expect(actions.claimTreasureSuccess({ genesisHash, sectorIdx })).toEqual(
    expected
  );
});
