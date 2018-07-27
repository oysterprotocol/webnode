export type RootState = {
  consent: ConsentState;
  node: NodeState;
  pow: PowState;
  treasureHunt: TreasureHuntState;
  test: TestState;
};

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

//consent actions
export interface GiveConsentAction extends Action {
  type: string;
}

export interface DenyConsentAction extends Action {
  type: string;
}

export type ConsentActions = DenyConsentAction | GiveConsentAction;

// node types
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

export interface UpdateSectorStatusType {
  genesisHash: string;
  sectorIdx: number;
  status: string;
}


// node actions
export interface InitializeAction extends Action {
  type: string;
}

export interface SetOwnerEthAddressAction extends Action {
  type: string;
  payload: {
    ethAddress: string;
  };
}

export interface DetermineBrokerNodeOrGenesisHashAction extends Action {
  type: string;
}

export interface DetermineGenesisHashOrTreasureHuntAction extends Action {
  type: string;
}

export interface RequestBrokerNodesAction extends Action {
  type: string;
}

export interface RequestGenesisHashesAction extends Action {
  type: string;
}

export interface AddBrokerNodeAction extends Action {
  type: string;
  payload: {
    obj: AddBrokerNodeType;
  };
}

export interface AddNewGenesisHashAction extends Action {
  type: string;
  payload: {
    obj: AddNewGenesisHashType;
  };
}

export interface ResetNodeAction extends Action {
  type: string;
  payload: {
    obj: ResetNodeType;
  };
}

export interface ResumeOrStartNewSectorAction extends Action {
  type: string;
  payload: {
    obj: ResumeOrStartNewSectorType;
  };
}

export interface CheckIfSectorClaimedAction extends Action {
  type: string;
  payload: {
    obj: CheckIfSectorClaimedType;
  };
}

export interface MarkSectorAsClaimedAction extends Action {
  type: string;
  payload: {
    obj: MarkSectorAsClaimedType;
  };
}

export interface UpdateSectorStatusAction extends Action {
  type: string;
  payload: {
    obj: UpdateSectorStatusType;
  };
}

export type NodeActions =
  | InitializeAction
  | SetOwnerEthAddressAction
  | DetermineBrokerNodeOrGenesisHashAction
  | DetermineGenesisHashOrTreasureHuntAction
  | RequestBrokerNodesAction
  | RequestGenesisHashesAction
  | AddBrokerNodeAction
  | AddNewGenesisHashAction
  | ResetNodeAction
  | ResumeOrStartNewSectorAction
  | CheckIfSectorClaimedAction
  | MarkSectorAsClaimedAction
  | UpdateSectorStatusAction;

// pow types
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

// pow actions

export interface RequestPoWAction extends Action {
  type: string;
  payload: {
    obj: RequestPoWType;
  };
}

export interface RequestPoWSuccessAction extends Action {
  type: string;
  payload: {
    obj: RequestPoWSuccessType;
  };
}

export interface PowCompleteAction extends Action {
  type: string;
}

export type PowActions =
  | RequestPoWAction
  | RequestPoWSuccessAction
  | PowCompleteAction;

// treasure-hunt types
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

export interface ClaimTreasureFailureType {
  genesisHash: string;
  sectorIdx: number;
}


// treasure-hunt actions
export interface StartSectorAction extends Action {
  type: string;
  payload: {
    obj: StartSectorType;
  };
}

export interface PerformPowAction extends Action {
  type: string;
}

export interface FindTreasureAction extends Action {
  type: string;
  payload: {
    obj: FindTreasureType;
  };
}

export interface SaveTreasureAction extends Action {
  type: string;
  payload: {
    obj: SaveTreasureType;
  };
}

export interface IncrementChunkAction extends Action {
  type: string;
  payload: {
    obj: IncrementChunkType;
  };
}

export interface ClaimTreasureAction extends Action {
  type: string;
  payload: {
    obj: ClaimTreasureType;
  };
}

export interface ClaimTreasureSuccessAction extends Action {
  type: string;
  payload: {
    obj: ClaimTreasureSuccessType;
  };
}

export interface ClaimTreasureFailureAction extends Action {
  type: string;
  payload: {
    obj: ClaimTreasureFailureType;
  };
}

export type TreasureHuntActions =
  | StartSectorAction
  | PerformPowAction
  | FindTreasureAction
  | SaveTreasureAction
  | IncrementChunkAction
  | ClaimTreasureAction
  | ClaimTreasureSuccessAction
  | ClaimTreasureFailureAction;
