import {Peer} from './peer';
//import {UUID} from 'angular2-uuid';

export class Org {
  //id = UUID.UUID;
  orgdomain : string ;
  orgname : string;
  peers : Array<Peer>;
}
