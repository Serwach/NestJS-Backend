import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/user.entity';
import { Order } from '../orders/order.entity';
import { OrderItem } from '../orders/order-item.entity';
import { Product } from '../products/product.entity';
import { Customer } from '../customers/customer.entity';

const [, , email, password, name] = process.argv;

if (!email || !password || !name) {
  console.error('Usage: npm run create-user -- <email> <password> <name>');
  process.exit(1);
}

const dataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'ecommerce',
  entities: [User, Order, OrderItem, Product, Customer],
});

async function run() {
  await dataSource.initialize();

  const repo = dataSource.getRepository(User);
  const existing = await repo.findOneBy({ email });

  if (existing) {
    console.error(`User with email "${email}" already exists.`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = repo.create({ email, password: hashed, name });
  await repo.save(user);

  console.log(`User created: ${name} <${email}>`);
  await dataSource.destroy();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
