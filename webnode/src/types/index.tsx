export type RootState = {
  consent: ConsentState;
  node: NodeState;
  pow: PowState;
  treasureHunt: TreasureHuntState;
  test: TestState;
}

export interface Action {
  type: string;
  payload?: {};
  params?: {};
}

// state
export interface PowState {
	powResults: any[];
	statuses: any[];
	consent: any;
}
export interface ConsentState {
	status: string;
}
export interface NodeState {
	ethAddress: any;
	brokerNodes: any[];
	newGenesisHashes: any[];
	oldGenesisHashes: any[];
	id: any;
	lastResetAt: any;
	sectors: any;
}
export interface TreasureHuntState {
	dataMapHash: any;
	genesisHash: any;
	chunkIdx: number;
	numberOfChunks: number;
	sectorIdx: number;
	treasure: any;
}
export interface TestState {
	treasures: any[];
	numberOfCalls: number;
}

// node-actions
export interface AddBrokerNodeType {
	address: string;
}
export interface AddNewGenesisHashType {
	genesisHash: string;
	numberOfChunks: number;
}
export interface ResetNodeType {
	id: number;
	lastResetAt: string;
}
export interface ResumeOrStartNewSectorType {
	genesisHash: string;
	sectorIdx: number;
	numberOfChunks: number;
}
export interface CheckIfSectorClaimedType {
	genesisHash: string;
	sectorIdx: number;
	numberOfChunks: number;
}
export interface MarkSectorAsClaimedType {
	genesisHash: string;
	sectorIdx: number;
}

// pow-actions
export interface RequestPoWType {
	branchTransaction: string;
	broadcastingNodes: string;
	mwm: number;
	trunkTransaction: string;
	trytes: any;
}
export interface RequestPoWSuccessType {
	arrayOfTrytes: any;
	broadcastingNodes: any;
}

// treasure-hunt-actions
export interface StartSectorType {
	dataMapHash: string;
	message: string;
	genesisHash: string;
	sectorIdx: number;
	numberOfChunks: number;
}
export interface FindTreasureType {
	dataMapHash: string;
	chunkIdx: number;
}
export interface SaveTreasureType {
	treasure: string;
	nextChunkIdx: number;
	nextDataMapHash: string;
}
export interface IncrementChunkType {
	nextChunkIdx: number;
	nextDataMapHash: string;
}
export interface ClaimTreasureType {
	treasure: string;
	genesisHash: string;
	numberOfChunks: number;
	receiverEthAddr: string;
	sectorIdx: number;
}
export interface ClaimTreasureSuccessType {
	genesisHash: string;
	sectorIdx: number;
}
