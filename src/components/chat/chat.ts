import { Component } from '@angular/core';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { NavParams } from 'ionic-angular';
import { CacheProvider } from '../../providers/cache/cache';

/**
 * Generated class for the ChatComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chat',
  templateUrl: 'chat.html'
})
export class ChatComponent {
  lista: any;
  mensagem: string;
  conversa: any;
  PATH: string = 'chat';
  user: string;

  constructor(public provider: AccessFirebaseProvider, public navParam: NavParams, public cache: CacheProvider) {
    this.conversa = navParam.get('conversa');
    this.user = navParam.get('user');
  }

  ionViewDidEnter() {
  }

  async enviar() {
    let msg = {
      mensagem: this.mensagem,
      data: new Date(),
      user: this.user
    }
    this.conversa.mensagens.push(msg);
    if (this.conversa.id) {
      await this.provider.update(this.PATH, this.conversa).then((conv) => {
        this.provider.get("anuncio", this.conversa.idAnuncio)
          .subscribe(resp => {
            if (!resp.anuncios[0]) {
              resp.anuncios[0] = conv;
            } else {
              resp.anuncios.push(conv);
            }
          });
      });
    } else {
      await this.provider.save(this.PATH, this.conversa).subscribe((conv) => {
        this.provider.get("anuncio", this.conversa.idAnuncio)
          .subscribe(resp => {
            if (!resp.anuncios[0]) {
              resp.anuncios[0] = conv;
            } else {
              resp.anuncios.push(conv);
            }
          });
      });
    }
    // this.user.conversas
    this.provider.update("usuario", this)
    this.cache.save('usuario', this.user);
    this.mensagem = "";
  }

}
