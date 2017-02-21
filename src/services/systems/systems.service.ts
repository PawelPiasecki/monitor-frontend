import { System } from './../../model/system';

export class SystemsService {  
  
   systems:System[];
 
    constructor() {
        this.systems = null;       
    }
  
    setSystems(systems) {
        this.systems = systems;       
    }
  
    getSystems() {
        return this.systems;
    }   
}