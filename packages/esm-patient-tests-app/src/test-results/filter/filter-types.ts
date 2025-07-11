import { type OBSERVATION_INTERPRETATION } from '@openmrs/esm-patient-common-lib';
import { type GroupedObservation } from '../../types';

interface Observation {
  display: string;
  flatName: string;
  hasData?: boolean;
}

export interface TreeNode {
  conceptUuid?: string;
  datatype?: string;
  display: string;
  flatName: string;
  subSets?: Array<TreeNode>;
  hasData?: boolean;
  hiCritical?: number;
  hiNormal?: number;
  lowAbsolute?: number;
  lowCritical?: number;
  lowNormal?: number;
  obs?: Array<ObservationData>;
  units?: string;
  range?: string;
  [x: string]: any;
}

export interface FilterNodeProps {
  root: TreeNode;
  level: number;
  open?: boolean;
}

export interface FilterLeafProps {
  leaf: Observation;
}

export interface TreeParents {
  [key: string]: Array<string>;
}

export interface TreeCheckboxes {
  [key: string]: boolean;
}

export interface TreeTests {
  [key: string]: TreeNode;
}

export type LowestNode = Pick<TreeNode, 'display' | 'flatName'>;

export interface ReducerState {
  checkboxes: TreeCheckboxes;
  parents: TreeParents;
  roots: Array<LowestNode>;
  tests: TreeTests;
  lowestParents: Array<TreeNode>;
}

export enum ReducerActionType {
  INITIALIZE = 'initialize',
  TOGGLEVAL = 'toggleVal',
  UDPATEPARENT = 'updateParent',
  UPDATEBASEPATH = 'updateBasePath',
  RESET_TREE = 'resetTree',
}

export interface ReducerAction {
  type: ReducerActionType;
  name?: string;
  trees?: Array<TreeNode>;
  filteredTrees?: Array<TreeNode>;
  basePath?: string;
}

export interface ObservationData {
  obsDatetime: string;
  value: string;
  interpretation: OBSERVATION_INTERPRETATION;
}

export interface ParsedTimeType {
  yearColumns: Array<{
    year: string;
    size: number;
  }>;
  dayColumns: Array<{
    year: string;
    day: string;
    size: number;
  }>;
  timeColumns: Array<string>;
  sortedTimes: Array<string>;
}
export interface TimelineData {
  loaded: boolean;
  data: {
    parsedTime: ParsedTimeType;
    rowData: Array<RowData>;
    panelName: string;
  };
}

export interface FilterContextProps extends ReducerState {
  timelineData: TimelineData;
  tableData: GroupedObservation[] | null;
  trendlineData: TreeNode | null;
  activeTests: string[];
  someChecked: boolean;
  totalResultsCount: number;
  isLoading: boolean;
  initialize: (trees: Array<TreeNode>, filteredTrees: Array<TreeNode>) => void;
  toggleVal: (name: string) => void;
  updateParent: (name: string) => void;
  resetTree: () => void;
}

export interface obsShape {
  [key: string]: any;
}

export interface RowData extends TreeNode {
  entries: Array<
    | {
        obsDatetime: string;
        value: string;
        interpretation: OBSERVATION_INTERPRETATION;
      }
    | undefined
  >;
}
