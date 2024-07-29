// database/resetDatabase.js
import DB from './database.js'

const resetDatabase = async () => {
  try {
    // Drop the product_partIds table if it exists
    await DB.raw('DROP TABLE IF EXISTS "product_partIds" CASCADE')
    console.log('Table product_partIds dropped successfully')

    // Drop the products table if it exists
    await DB.raw('DROP TABLE IF EXISTS "products" CASCADE')
    console.log('Table products dropped successfully')

    // Create the products table
    await DB.schema.createTable('products', table => {
      table.increments('id').primary()
      table.string('supplier', 255).notNullable()
      table.string('productId', 255).notNullable()
      table.text('partId', 1000) // Changed to text to remove length limit
      table.text('name') // Changed to text to remove length limit
      table.text('brand') // Changed to text to remove length limit
      table.text('category') // Changed to text to remove length limit
      table.text('color') // Changed to text to remove length limit
      table.text('imageUrl') // Changed to text to remove length limit
      table.text('keyword') // Changed to text to remove length limit
      table.date('effectiveDate')
      table.unique(['supplier', 'productId'])
    })
    console.log('Table products created successfully')

    // Create the product_partIds table
    await DB.schema.createTable('product_partIds', table => {
      table.increments('id').primary()
      table.string('supplier', 255).notNullable()
      table.string('productId', 255).notNullable()
      table.string('partId', 1000).notNullable()
      table.string('color', 1000)
      table.unique(['supplier', 'productId', 'partId']) // Composite unique key
      table
        .foreign(['supplier', 'productId'])
        .references(['supplier', 'productId'])
        .inTable('products')
    })
    console.log('Table product_partIds created successfully')

    // Reset the sequence associated with the id column for products
    await DB.raw('ALTER SEQUENCE products_id_seq RESTART WITH 1')
    console.log('Sequence products_id_seq reset successfully')

    // Find and reset the sequence associated with the id column for product_partIds
    const result = await DB.raw(`
      SELECT pg_get_serial_sequence('"product_partIds"', 'id') AS sequence_name
    `)
    const sequence_name = result.rows[0]?.sequence_name

    if (sequence_name) {
      await DB.raw(`ALTER SEQUENCE ${sequence_name} RESTART WITH 1`)
      console.log(`Sequence ${sequence_name} reset successfully`)
    } else {
      console.log('Sequence for product_partIds.id not found')
    }
  } catch (error) {
    console.error('Error resetting database:', error)
  } finally {
    await DB.destroy()
  }
}

resetDatabase()
