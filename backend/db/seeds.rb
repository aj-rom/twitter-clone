# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

post1 = Post.create(name: 'AJ Romaniello', content: 'Welcome to my very Basic Twitter Clone')
post1.comments.build(name: 'Derek H.', content: 'Wow I left a comment, maybe I should even like this post!').save

post2 = Post.create(name: 'Derek H.', content: 'My first post! Leave a like and a comment :)')
post2.comments.build(name: 'AJ Romaniello', content: 'Welcome to the site!').save

post3 = Post.create(name: 'Steven Milner', content: 'I love coding in ruby, but javascript is pretty cool too...')