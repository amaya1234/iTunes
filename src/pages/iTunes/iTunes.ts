import { Component } from "@angular/core";
import { iTunesService } from "../../app/buscariTunes.service";
import { Observable } from "rxjs/Observable";
import { Resultado } from "../../app/resultadosiTunes.model";
import { Cancion } from "../../app/cancion.model";
import { Platform } from "ionic-angular/umd";

@Component(
  {
    selector: 'iTunes',
    templateUrl: 'iTunes.html',
    providers: [iTunesService]
    
  })
  export class iTunesComponent 
  {
    busqueda_usuario: string;
    array_canciones : Cancion[];
    cargado : boolean = false;
    esMovil: boolean;

    esEntornoMovil():boolean
    {
      let esmovil: boolean = false;
      esmovil = !(this.plt.is('mobileweb') || this.plt.is('core'));//si es mobileweb o se escritorio, es decir que está en un navegador, no está en la app
      return esmovil;
    }

    constructor(public iTunes_service: iTunesService, public plt: Platform)//Aqui se añaden los servicios que se van a utilizar
    // aquí se inicializa lo primero porque es lo promero qu ese ejecuta y la pagina se visualiza
    {
      console.log ("La pagina html se va a cargar");
      this.busqueda_usuario="";//Este valor a parece en el html por el [(ngModel)], hace get y set
      this.cargado = false;

      if (this.esEntornoMovil())
      {
        console.log ("Se está ejecutando en un móvil");
        this.esMovil=true;
      }else
      {
        console.log ("Se está ejecutando en una web");
        this.esMovil=false;
      }
    }
    Buscar()
    {
      console.log("Ha tocado buscar: "+this.busqueda_usuario);
      let resultado : Observable<Resultado> = this.iTunes_service.buscar(this.busqueda_usuario);
      resultado.subscribe(jsonCanciones => this.procesarCanciones(jsonCanciones));//me devuelve un observable
    }
    procesarCanciones ( jsonCanciones : any)//Te voy a observar
    {
      //hay que hacer el casting a resultado que recibe el modelo del json que recibo
      let infocanciones : Resultado = <Resultado>jsonCanciones;
      this.array_canciones = infocanciones.results;
      this.cargado= true;

      console.log(this.array_canciones[0].artistName);
  }
}
