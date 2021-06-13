import * as signalR from '@microsoft/signalr';
import {environment} from '../../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  buildHubConnection(hub: string): signalR.HubConnection {
    return new signalR.HubConnectionBuilder()
      .withUrl(`${environment.signalRBaseUrl}/${hub}`)
      .withAutomaticReconnect()
      .build();
  }
}
