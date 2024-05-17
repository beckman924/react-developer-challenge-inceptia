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
