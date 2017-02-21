import {Pipe} from "@angular/core"

@Pipe({
    name:"isActive"
})

export class ActivePipe{
    transform(value){
        console.log(value);
        return value.filter((item)=> item.isActive);
    }
}