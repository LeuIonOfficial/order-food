import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

class UserService {
  async createUser(data: any) {
    return prisma.user.create({ data })
  }
}

class ProductService {
  async createProduct(data: any) {
    return prisma.product.create({ data })
  }
}

class ReviewService {
  async createReview(data: any) {
    return prisma.review.create({ data })
  }
}

async function main() {
  // Clear existing data
  await prisma.review.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  const userService = new UserService()
  const productService = new ProductService()
  const reviewService = new ReviewService()

  // Create cooks
  const cook1 = await prisma.user.create({
    data: {
      email: 'maria.bucatar@gmail.com',
      name: 'Maria Bucătar',
      phone: '+373 60000001',
      address: 'Strada Ștefan cel Mare 10',
      city: 'Chișinău',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      isCook: true,
      rating: 0,
    },
  })

  const cook2 = await prisma.user.create({
    data: {
      email: 'vasile.gospodar@gmail.com',
      name: 'Vasile Gospodar',
      phone: '+373 60000002',
      address: 'Strada Independenței 5',
      city: 'Bălți',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      isCook: true,
      rating: 0,
    },
  })

  const cook3 = await prisma.user.create({
    data: {
      email: 'elena.cucina@gmail.com',
      name: 'Elena Cucina',
      phone: '+373 60000003',
      address: 'Strada Ismail 15',
      city: 'Chișinău',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      isCook: true,
      rating: 0,
    },
  })

  const cook4 = await prisma.user.create({
    data: {
      email: 'ion.chef@gmail.com',
      name: 'Ion Chef',
      phone: '+373 60000004',
      address: 'Strada Decebal 8',
      city: 'Tiraspol',
      avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
      isCook: true,
      rating: 0,
    },
  })

  // Create customers
  const customer1 = await prisma.user.create({
    data: {
      email: 'ana.client@gmail.com',
      name: 'Ana Client',
      phone: '+373 60000005',
      address: 'Strada Eminescu 15',
      city: 'Chișinău',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
      isCook: false,
      rating: 0,
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      email: 'mihai.client@gmail.com',
      name: 'Mihai Client',
      phone: '+373 60000006',
      address: 'Strada Pushkin 22',
      city: 'Bălți',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      isCook: false,
      rating: 0,
    },
  })

  // Create products
  const products = [
    // Fel principal
    {
      name: 'Sarmale de casă',
      description: 'Sarmale tradiționale moldovenești cu carne și orez, gătite în foi de varză.',
      price: 120,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
      category: 'Fel principal',
      isAvailable: true,
      cookId: cook1.id,
    },
    {
      name: 'Mămăligă cu brânză',
      description: 'Mămăligă cremoasă cu brânză de oi și smântână proaspătă.',
      price: 80,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: 'Fel principal',
      isAvailable: true,
      cookId: cook2.id,
    },
    {
      name: 'Tocăniță de vită',
      description: 'Tocăniță tradițională cu carne de vită, legume și sos bogat.',
      price: 150,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400&h=300&fit=crop',
      category: 'Fel principal',
      isAvailable: true,
      cookId: cook3.id,
    },
    {
      name: 'Pui la grătar',
      description: 'Piept de pui la grătar cu sos de usturoi și ierburi aromate.',
      price: 100,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop',
      category: 'Fel principal',
      isAvailable: true,
      cookId: cook4.id,
    },
    
    // Gustare
    {
      name: 'Plăcinte cu brânză',
      description: 'Plăcinte pufoase cu brânză de vaci și verdeață, gătite în ulei.',
      price: 60,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?w=400&h=300&fit=crop',
      category: 'Gustare',
      isAvailable: true,
      cookId: cook1.id,
    },
    {
      name: 'Covrigei calzi',
      description: 'Covrigei proaspeți cu susan, perfecti pentru micul dejun.',
      price: 40,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=300&fit=crop',
      category: 'Gustare',
      isAvailable: true,
      cookId: cook2.id,
    },
    {
      name: 'Salată de vinete',
      description: 'Salată tradițională de vinete cu ceapă și ulei de floarea soarelui.',
      price: 50,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&h=300&fit=crop',
      category: 'Gustare',
      isAvailable: true,
      cookId: cook3.id,
    },
    
    // Desert
    {
      name: 'Pască tradițională',
      description: 'Pască cu brânză de vaci și stafide, gătită după rețeta bunicii.',
      price: 90,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
      category: 'Desert',
      isAvailable: true,
      cookId: cook1.id,
    },
    {
      name: 'Gogoașe cu gem',
      description: 'Gogoașe pufoase cu gem de căpșuni, presărate cu zahăr pudră.',
      price: 70,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
      category: 'Desert',
      isAvailable: true,
      cookId: cook2.id,
    },
    {
      name: 'Plăcintă cu mere',
      description: 'Plăcintă cu mere proaspete și scorțișoară, gătită în cuptor.',
      price: 85,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop',
      category: 'Desert',
      isAvailable: true,
      cookId: cook3.id,
    },
    
    // Băuturi
    {
      name: 'Compot de prune',
      description: 'Compot natural de prune, fără conservanți, perfect pentru vară.',
      price: 30,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
      category: 'Băuturi',
      isAvailable: true,
      cookId: cook4.id,
    },
    {
      name: 'Limonadă de casă',
      description: 'Limonadă proaspătă cu lămâie și mentă, perfectă pentru răcoare.',
      price: 25,
      currency: 'MDL',
      image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=300&fit=crop',
      category: 'Băuturi',
      isAvailable: true,
      cookId: cook1.id,
    },
  ]

  for (const productData of products) {
    const product = await prisma.product.create({
      data: productData,
    })

    // Add reviews for some products
    if (product.name === 'Sarmale de casă') {
      await prisma.review.create({
        data: {
          rating: 5,
          comment: 'Sarmalele au fost delicioase! Recomand cu drag.',
          customerId: customer1.id,
          cookId: cook1.id,
          productId: product.id,
        },
      })
    }

    if (product.name === 'Plăcinte cu brânză') {
      await prisma.review.create({
        data: {
          rating: 4,
          comment: 'Plăcintele au fost bune, dar puțin sărate.',
          customerId: customer2.id,
          cookId: cook2.id,
          productId: product.id,
        },
      })
    }

    if (product.name === 'Mămăligă cu brânză') {
      await prisma.review.create({
        data: {
          rating: 5,
          comment: 'Mămăliga a fost perfectă! Brânza era delicioasă.',
          customerId: customer1.id,
          cookId: cook2.id,
          productId: product.id,
        },
      })
    }

    if (product.name === 'Pască tradițională') {
      await prisma.review.create({
        data: {
          rating: 5,
          comment: 'Pasca a fost exact ca la bunica! Foarte gustoasă.',
          customerId: customer2.id,
          cookId: cook1.id,
          productId: product.id,
        },
      })
    }
  }

  const adminEmail = "admin@gustulcasei.md"
  const adminPassword = "admin123"
  const adminName = "Admin"

  const existing = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (!existing) {
    const hashed = await bcrypt.hash(adminPassword, 12)
    await prisma.user.create({
      data: {
        email: adminEmail,
        name: adminName,
        password: hashed,
        isAdmin: true,
        isVerified: true,
        emailVerified: new Date(),
      },
    })
    console.log("Seeded admin user.")
  } else {
    console.log("Admin user already exists.")
  }

  // Create sample orders
  const createdProducts = await prisma.product.findMany()
  
  // Order 1: PENDING
  const order1 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      cookId: cook1.id,
      status: "PENDING",
      total: 180,
      currency: "MDL",
      address: "Strada Eminescu 15, Chișinău",
      phone: "+373 60000005",
      notes: "Te rog să fie calde sarmalele",
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: createdProducts.find((p: any) => p.name === "Sarmale de casă")!.id,
      quantity: 1,
      price: 120,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      productId: createdProducts.find((p: any) => p.name === "Plăcinte cu brânză")!.id,
      quantity: 1,
      price: 60,
    },
  })

  // Order 2: CONFIRMED
  const order2 = await prisma.order.create({
    data: {
      customerId: customer2.id,
      cookId: cook2.id,
      status: "CONFIRMED",
      total: 120,
      currency: "MDL",
      address: "Strada Pushkin 22, Bălți",
      phone: "+373 60000006",
      notes: "Livrare la ușă",
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: createdProducts.find((p: any) => p.name === "Mămăligă cu brânză")!.id,
      quantity: 1,
      price: 80,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      productId: createdProducts.find((p: any) => p.name === "Covrigei calzi")!.id,
      quantity: 1,
      price: 40,
    },
  })

  // Order 3: PREPARING
  const order3 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      cookId: cook3.id,
      status: "PREPARING",
      total: 200,
      currency: "MDL",
      address: "Strada Eminescu 15, Chișinău",
      phone: "+373 60000005",
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: createdProducts.find((p: any) => p.name === "Tocăniță de vită")!.id,
      quantity: 1,
      price: 150,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      productId: createdProducts.find((p: any) => p.name === "Salată de vinete")!.id,
      quantity: 1,
      price: 50,
    },
  })

  // Order 4: READY
  const order4 = await prisma.order.create({
    data: {
      customerId: customer2.id,
      cookId: cook4.id,
      status: "READY",
      total: 130,
      currency: "MDL",
      address: "Strada Pushkin 22, Bălți",
      phone: "+373 60000006",
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: createdProducts.find((p: any) => p.name === "Pui la grătar")!.id,
      quantity: 1,
      price: 100,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      productId: createdProducts.find((p: any) => p.name === "Compot de prune")!.id,
      quantity: 1,
      price: 30,
    },
  })

  // Order 5: DELIVERED
  const order5 = await prisma.order.create({
    data: {
      customerId: customer1.id,
      cookId: cook1.id,
      status: "DELIVERED",
      total: 175,
      currency: "MDL",
      address: "Strada Eminescu 15, Chișinău",
      phone: "+373 60000005",
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      productId: createdProducts.find((p: any) => p.name === "Pască tradițională")!.id,
      quantity: 1,
      price: 90,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      productId: createdProducts.find((p: any) => p.name === "Gogoașe cu gem")!.id,
      quantity: 1,
      price: 70,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      productId: createdProducts.find((p: any) => p.name === "Limonadă de casă")!.id,
      quantity: 1,
      price: 25,
    },
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 