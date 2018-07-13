import { StateType } from "typesafe-actions";
import rootReducer from "../redux/reducers";

// redux root reducer
export type RootState = StateType<typeof rootReducer>;

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
