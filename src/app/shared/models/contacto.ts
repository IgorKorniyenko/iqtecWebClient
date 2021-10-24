import { Searchable } from "./searchable";

export class Contacto implements Searchable{
    
    contactoPrin : string;
    tlfPrin : string;
    movilPrin : string;
	mailPrin : string;
    contactoSec! : string;
    tlfSec! : string;
    movilSec! : string;
	mailSec! : string;

    constructor(){
        this.contactoPrin = "";
        this.tlfPrin = "";
        this.movilPrin = "";
        this.mailPrin = "";
    }
}