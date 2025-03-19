import { Plugin } from '@hapi/hapi';
import { createDogHandler } from './create-dog';
import { getDogHandler } from './get-dog';
import { updateDogHandler } from './update-dog';
import { deleteDogHandler } from './delete-dog';

export const routes: Plugin<{}> = {
  register: (server, options) => {
    server.route([
      {
        method: 'POST',
        path: '/',
        options: {
          handler: createDogHandler,
          auth: false,
        },
      },
      {
        method: 'GET',
        path: '/{dogId}',
        options: {
          handler: getDogHandler,
          auth: false,
        },
      },
      {
        method: 'PUT',
        path: '/{dogId}',
        options: {
          handler: updateDogHandler,
          auth: false,
        },
      },
      {
        method: 'DELETE',
        path: '/{dogId}',
        options: {
          handler: deleteDogHandler,
          auth: false,
        },
      },
    ]);
  },
  name: 'dogs',
};

export default routes;
