import {Orderer} from './orderer';
//import { UUID } from 'angular2-uuid';

export class OrderOrg {
  //id = UUID.UUID;
  orderorgname : string ;
  orderorgdomain : string;
  orderers : Array<Orderer>;
}
