export interface Images {
  title: string;
  createdDate: string;
  _id: string;
  photoUrl: string;
}

export interface ReducerType {
  files: Images[];
  loading: boolean;
  error: Error | null;
  uploadLoading: boolean;
  uploadError: Error | null;
  uploadSuccess: boolean;
}

export interface Error {
  message: string;
  statusCode: number;
  requestStatus: string;
}
