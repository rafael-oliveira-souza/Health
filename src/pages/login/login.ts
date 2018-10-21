import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AccessFirebaseProvider } from '../../providers/access-firebase/access-firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormsComponent } from '../../components/forms/forms';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  private mostrarSenha = false;
  private imagem;
  private loginErrorString: string = '';

  constructor(public navCtrl: NavController, public provider: AccessFirebaseProvider,
    private authorization: AngularFireAuth) {
  }

  // Attempt to login in through our User service
  doLogin() {
        this.navCtrl.setRoot(HomePage)
    if (this.account.email && this.account.password) {
      let login = this.authorization.auth.signInWithEmailAndPassword(this.account.email, this.account.password);
      login.then(() => {
        this.navCtrl.setRoot(HomePage)
      }).catch(error => {
        this.loginErrorString = 'Email ou Senha Incorretos';
      });
    } else {
      this.loginErrorString = 'Preencha os Campos';
    }
  }

  teste() {
    let nov = {
      nome: 'rafa',
      data: '1994-03-03',
      imagem: '41682102_1406592266152427_7612888278722674688_n.jpg',
      cidade: 'Brasilia',
      estado: 'Distrito Federal',
      email: 'rafa@hotmail.com',
      senha: '123123123',
      confirmarSenha: '123123123',
    }
    console.log(nov.imagem)
    this.provider.upload(nov);
  }

  registrar() {
    this.navCtrl.setRoot(FormsComponent)
  }
}
