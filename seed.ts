import mongoose from 'mongoose';
import User from './models/users.model';

mongoose.connect('mongodb://localhost:27017/dice_and_dealers')
  .then(async () => {
    await User.create({
      email: 'teste@teste.com',
      password: '$2b$10$NDOx0XGRAqULN0uXMYt.YO6ZRIb5Ik8iM11wLxPhLIXt4DTHFJh1W' // lembre-se de hashear se o modelo exigir
    });

    console.log('Usuário criado!');
    mongoose.disconnect();
  });
