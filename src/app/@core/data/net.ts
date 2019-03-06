import {OrderOrg} from './orderorg';
import {Org} from './org';
//import { UUID } from 'angular2-uuid';

export class Net {
  //id = UUID.UUID();
  nettype : string;
  netname : string;
  netdesc : string;
  ordertype : string;
  orderorgs: Array<OrderOrg>;
  orgs: Array<Org>;
}
