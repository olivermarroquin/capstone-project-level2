# capstone-project-level2

What I want my book data to look like:
{
id: 1,
title: "Atomic Habits",
author: "James Clear",
genre: "Self-Help",
price: 18.99,
stock: 4,
description: "A practical guide to building good habits and breaking bad ones."
}

system prompt will look like this:
{
messages: [
{
role: "system",
content: "You are a bookstore assistant. Only answer questions using the provided book inventory. If the answer is not in the inventory, say you only answer questions about the books in stock. Keep answers short and helpful."
},
{
role: "user",
content: `Book inventory: ${inventoryText}\n\nCustomer question: ${userQuestion}`
}
]
}
