import { Injectable } from "@angular/core";
import { Resultado } from "./resultadosiTunes.model";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Injectable()

export class iTunesService {

    constructor(private http: HttpClient)//si quiero acceder a la cámara, se añade aqui: private camara...
     {

    }

    buscar (busqueda:string):Observable<Resultado>//se necesita http para conmunicar son el servidor para coger datos externos
    {
        let resultado : Observable<Resultado>;//creo una varialbe de tipo Observable <Resultado>
        resultado = this.http.get<Resultado>("https://itunes.apple.com/search?term="+busqueda+"&media=music&limit=20");
        return resultado; //return de los que hemos hecho
    }

}

