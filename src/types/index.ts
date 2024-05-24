export interface Clients {
  id: number;
  name: string;
  alias: string;
  users: User[];
}

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  language: string;
  profile_image: null;
  groups: Group[];
  business_group: any[];
  is_active: boolean;
}

interface Group {
  id: number;
  name: string;
}

export interface Cases {
  count: number;
  next: string | null;
  previous: string | null;
  results: Result[];
}

interface Result {
  id: number;
  bot: Bot;
  case_uuid: string;
  phone: number;
  first_name: string;
  last_name: string;
  code: null;
  case_result: CaseResult;
  case_duration: string;
  case_log: Caselog;
  extra_metadata: Extrametadata;
  recording: string;
  is_complete: boolean;
  status: string;
  last_updated: string;
  is_active: boolean;
}

interface Extrametadata {
  dni?: string;
  grupo?: string;
  orden?: string;
}

interface Caselog {
  responses: Response[];
  result_id: number;
  commitment: string;
  got_promise: boolean;
  transcription: Response[];
  final_sip_code: number;
}

interface Response {
  text: string;
  time: number;
  confidence: number;
}

interface CaseResult {
  result_id: number;
  name: string;
  is_final: boolean;
  contacted: boolean;
}

interface Bot {
  id: number;
  name: string;
  alias: string;
}

export interface TableData {
  gestionado?: string | null;
  id_case: string;
  tel: number;
  dni?: string | null;
  grupo?: string | null;
  orden?: string | null;
  llamada: string;
  estado: string;
}
