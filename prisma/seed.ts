import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🔁 Iniciando seed...");

  // Cria usuário com senha criptografada
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@vitrina.com' },
    update: {},
    create: {
      email: 'admin@vitrina.com',
      password: hashedPassword,
    },
  });

  // Cria clientes
  const customer1 = await prisma.customer.create({
    data: {
      name: 'João Silva',
      email: 'joao@teste.com',
      phone: '(11) 99999-0001',
      authUserId: 'fake-auth-id-joao',
      userId: user.id,
    },
  });

  const customer2 = await prisma.customer.create({
    data: {
      name: 'Maria Oliveira',
      email: 'maria@teste.com',
      phone: '(11) 99999-0002',
      authUserId: 'fake-auth-id-maria',
      userId: user.id,
    },
  });

  // Cria produtos
  const product1 = await prisma.product.create({
    data: {
      name: 'Copo Personalizado',
      price: 29.9,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Camiseta Estampada',
      price: 49.9,
    },
  });

  // Cria locais de retirada
  const location1 = await prisma.pickupLocation.create({
    data: {
      name: 'Loja Centro',
    },
  });

  // Cria campanha
  const campaign = await prisma.campaign.create({
    data: {
      name: 'Dia das Mães 2025',
    },
  });

  // Cria pedido com itens
  const order = await prisma.order.create({
    data: {
      status: 'confirmado',
      paymentStatus: 'pago',
      paymentMethod: 'Pix',
      totalAmount: 79.8,
      pickupDate: new Date('2025-05-10T10:00:00'),
      pickupTime: '10:00',
      customerId: customer1.id,
      pickupLocationId: location1.id,
      campaignId: campaign.id,
      orderItems: {
        create: [
          {
            productId: product1.id,
            quantity: 1,
            unitPrice: product1.price,
          },
          {
            productId: product2.id,
            quantity: 1,
            unitPrice: product2.price,
          },
        ],
      },
    },
  });

  console.log("✅ Seed finalizado com sucesso!");
}

main()
  .catch(e => {
    console.error("❌ Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
