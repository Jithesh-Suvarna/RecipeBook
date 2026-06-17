import { Recipe } from "../types";

export const SAMPLE_RECIPES: Recipe[] = [
  {
    id: "sample-1",
    title: "Avocado Toast with Poached Egg",
    mealType: "Breakfast",
    difficulty: "Easy",
    cookTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "2 slices of sourdough bread",
      "1 ripe avocado",
      "2 large eggs",
      "1 tbsp vinegar (for poaching)",
      "Red pepper flakes",
      "Salt and black pepper to taste",
      "Microgreens for garnish"
    ],
    instructions: [
      "Bring a pot of water to a gentle simmer and add vinegar.",
      "Crack each egg into a small cup, swirl the water, and gently drop the eggs in. Poach for 3 minutes.",
      "Toast the sourdough bread slices until golden brown and crispy.",
      "Mash the avocado in a bowl with a pinch of salt and paper.",
      "Spread the mashed avocado evenly across the warm toasted sourdough.",
      "Place a poached egg on top of each toast slice.",
      "Garnish with red pepper flakes, black pepper, and microgreens before serving hot."
    ],
    nutrition: {
      calories: 320,
      protein: "14g",
      carbs: "24g",
      fat: "18g"
    }
  },
  {
    id: "sample-2",
    title: "Blueberry Pancakes",
    mealType: "Breakfast",
    difficulty: "Easy",
    cookTime: 20,
    imageUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "1 cup all-purpose flour",
      "1 tbsp sugar",
      "1 tsp baking powder",
      "1/2 tsp baking soda",
      "1/4 tsp salt",
      "3/4 cup buttermilk",
      "1 large egg",
      "2 tbsp melted butter",
      "1/2 cup fresh blueberries",
      "Maple syrup for serving"
    ],
    instructions: [
      "In a large bowl, whisk together the dry ingredients (flour, sugar, baking powder, baking soda, salt).",
      "In another bowl, whisk buttermilk, egg, and melted butter.",
      "Pour wet ingredients into dry ingredients and stir gently until just combined (some lumps are fine).",
      "Heat a non-stick griddle over medium heat and lightly grease with butter.",
      "Pour 1/4 cup of batter per pancake onto the griddle.",
      "Drop several blueberries onto each pancake's top.",
      "Cook until bubbles form on the surface, then flip and cook other side until brown, about 2 minutes.",
      "Serve warm stacked with butter and maple syrup."
    ],
    nutrition: {
      calories: 410,
      protein: "8g",
      carbs: "62g",
      fat: "14g"
    }
  },
  {
    id: "sample-3",
    title: "Grilled Chicken Caesar Salad",
    mealType: "Lunch",
    difficulty: "Medium",
    cookTime: 25,
    imageUrl: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "2 chicken breasts",
      "1 large head of romaine lettuce",
      "1/2 cup croutons",
      "1/4 cup grated parmesan cheese",
      "2 tbsp olive oil",
      "1/3 cup Caesar dressing",
      "1 lemon (juiced)",
      "Salt, pepper, and garlic powder"
    ],
    instructions: [
      "Season chicken breasts with olive oil, salt, pepper, and garlic powder.",
      "Grill the chicken for 5-6 minutes per side, or until internal temperature reaches 165°F (74°C). Let rest, then slice.",
      "Chop romaine lettuce into bite-sized pieces and wash thoroughly.",
      "In a large serving bowl, toss the lettuce with the sliced chicken, Caesar dressing, and lemon juice.",
      "Sprinkle croutons and grated parmesan cheese on top of the salad.",
      "Serve immediately, offering extra freshly cracked black pepper"
    ],
    nutrition: {
      calories: 480,
      protein: "38g",
      carbs: "12g",
      fat: "32g"
    }
  },
  {
    id: "sample-4",
    title: "Spicy Lentil Soup",
    mealType: "Lunch",
    difficulty: "Easy",
    cookTime: 35,
    imageUrl: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "1 cup dry red lentils",
      "1 medium yellow onion (diced)",
      "2 carrots (chopped)",
      "2 cloves garlic (chopped)",
      "1 can chopped tomatoes",
      "4 cups vegetable broth",
      "1 tsp cumin seeds",
      "1 tsp chili flakes",
      "2 tbsp olive oil",
      "Fresh cilantro for garnish"
    ],
    instructions: [
      "Heat olive oil in a large saucepan over medium heat.",
      "Sauté onion, carrots, and cumin seeds until vegetables begin to soften (around 5 minutes).",
      "Add garlic and chili flakes and stir for another minute.",
      "Rinse red lentils and add them to the saucepan along with chopped tomatoes and vegetable broth.",
      "Bring soup to a boil, then turn heat down and simmer for 25 minutes until lentils are soft.",
      "Blend partially with an immersion blender if you prefer a thicker texture.",
      "Taste, season with salt, and ladle into bowls. Top with fresh cilantro."
    ],
    nutrition: {
      calories: 280,
      protein: "16g",
      carbs: "42g",
      fat: "6g"
    }
  },
  {
    id: "sample-5",
    title: "Margherita Flatbread",
    mealType: "Snack",
    difficulty: "Easy",
    cookTime: 15,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "1 pre-baked flatbread or naan",
      "2 tbsp marinara sauce",
      "1/2 cup fresh mozzarella slices",
      "1 ripe tomato (thinly sliced)",
      "A handful of fresh basil leaves",
      "1 tbsp extra virgin olive oil",
      "Balsamic glaze for drizzling"
    ],
    instructions: [
      "Preheat your oven to 400°F (200°C).",
      "Place flatbread on a baking sheet and spread marinara sauce evenly over it.",
      "Arrange the tomato slices and fresh mozzarella slices on top.",
      "Bake in the preheated oven for 10-12 minutes until flatbread is crisp and cheese is bubbly and melted.",
      "Remove from oven and instantly arrange fresh basil leaves across the flatbread.",
      "Drizzle with olive oil and a sweet balsamic glaze. Slit into slices and serve."
    ],
    nutrition: {
      calories: 350,
      protein: "14g",
      carbs: "38g",
      fat: "16g"
    }
  },
  {
    id: "sample-6",
    title: "Beef Tacos with Mango Salsa",
    mealType: "Dinner",
    difficulty: "Medium",
    cookTime: 30,
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "500g lean ground beef",
      "1 packet taco seasoning",
      "8 taco shells",
      "1 ripe mango (peeled and diced)",
      "1/2 red bell pepper (diced)",
      "1/4 red onion (finely chopped)",
      "Juice of 1 lime",
      "Fresh cilantro (chopped)",
      "Shredded lettuce for taco filling"
    ],
    instructions: [
      "In a medium frying pan, brown the ground beef on medium-high heat. Drain fat.",
      "Stir in taco seasoning and water according to packet instructions. Simmer for 10 minutes.",
      "In a separate bowl, toss together the diced mango, red pepper, red onion, lime juice, and cilantro to make the mango salsa.",
      "Warm the taco shells in the oven for 3-5 minutes.",
      "Assemble taco shells by adding a layer of ground beef, followed by shredded lettuce.",
      "Top generously with the colorful mango salsa and serve with lime wedges."
    ],
    nutrition: {
      calories: 520,
      protein: "32g",
      carbs: "44g",
      fat: "24g"
    }
  },
  {
    id: "sample-7",
    title: "Creamy Tuscan Salmon",
    mealType: "Dinner",
    difficulty: "Medium",
    cookTime: 25,
    imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "2 salmon fillets",
      "1 tbsp olive oil",
      "2 cloves garlic (minced)",
      "1/2 cup sun-dried tomatoes (chopped)",
      "2 cups fresh spinach",
      "1/2 cup heavy cream",
      "1/4 cup chicken or vegetable broth",
      "1/4 cup grated parmesan cheese",
      "Salt, pepper, and oregano"
    ],
    instructions: [
      "Season salmon fillets on both sides with salt, pepper, and a pinch of oregano.",
      "Heat olive oil in a skillet on medium heat. Sear salmon for 5 minutes each side until golden; set salmon aside.",
      "In the same skillet, sauté garlic for 1 minute, then add sun-dried tomatoes and spinach. Cook until spinach is wilted.",
      "Pour in heavy cream and broth; bring to a light simmer.",
      "Stir in parmesan cheese and let the sauce simmer for 2-3 minutes until thickened.",
      "Return salmon to the skillet, spoon sauce over fillets, and simmer for an additional 2 minutes before serving."
    ],
    nutrition: {
      calories: 610,
      protein: "42g",
      carbs: "8g",
      fat: "44g"
    }
  },
  {
    id: "sample-8",
    title: "Thai Green Curry",
    mealType: "Dinner",
    difficulty: "Hard",
    cookTime: 50,
    imageUrl: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "2 chicken breasts (sliced)",
      "2 tbsp Thai green curry paste",
      "1 can (400ml) coconut milk",
      "1 cup bamboo shoots",
      "1 red bell pepper (sliced)",
      "1/2 cup snap peas",
      "1 tbsp fish sauce",
      "1 tbsp brown sugar",
      "Fresh Thai basil leaves",
      "Cooked jasmine rice for serving"
    ],
    instructions: [
      "Heat a large wok or pot over medium-high heat and ladle 2 tbsp of coconut milk cream from the top of the can.",
      "Sauté Thai green curry paste in the coconut cream for 2 minutes until fragrant.",
      "Add sliced chicken breasts and stir-fry until the chicken turns opaque (about 4 minutes).",
      "Pour in the remaining coconut milk and bring cook mixture to a gentle boil.",
      "Add red bell pepper, snap peas, and bamboo shoots. Simmer for 15-20 minutes.",
      "Season with fish sauce and brown sugar.",
      "Tear fresh Thai basil leaves into the curry, stir briefly, and remove from heat.",
      "Serve warm in bowls alongside fragrant jasmine rice."
    ],
    nutrition: {
      calories: 590,
      protein: "34g",
      carbs: "30g",
      fat: "38g"
    }
  },
  {
    id: "sample-9",
    title: "Mushroom Risotto",
    mealType: "Dinner",
    difficulty: "Hard",
    cookTime: 55,
    imageUrl: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "1.5 cups Arborio rice",
      "250g mixed wild mushrooms (sliced)",
      "1 small yellow onion (finely chopped)",
      "2 cloves garlic (chopped)",
      "1/2 cup dry white wine",
      "4-5 cups hot vegetable broth",
      "4 tbsp butter",
      "1/2 cup grated parmesan cheese",
      "2 tbsp olive oil",
      "Salt and fresh parsley"
    ],
    instructions: [
      "Heat vegetable broth in a separate saucepan and keep warm over low heat.",
      "In a large pan, sauté sliced mushrooms in olive oil until golden brown. Transfer to a plate.",
      "In the same pan, melt 2 tbsp of butter and sauté onion and garlic until translucent.",
      "Add Arborio rice and toast for 2 minutes, stirring continuously.",
      "Pour in dry white wine and cook until absorbed completely.",
      "Add a ladleful of hot vegetable broth. Stir constantly until mixture absorbs the liquid.",
      "Continue adding broth, one ladleful at a time, stirring continuously, waiting until each is absorbed before adding more. This will take about 20-25 minutes.",
      "Gently stir in the cooked mushrooms, remaining 2 tbsp butter, and parmesan cheese.",
      "Season with salt and garnish with fresh parsley. Serve hot, luxurious, and creamy."
    ],
    nutrition: {
      calories: 540,
      protein: "12g",
      carbs: "68g",
      fat: "22g"
    }
  },
  {
    id: "sample-10",
    title: "Chocolate Lava Cake",
    mealType: "Dessert",
    difficulty: "Medium",
    cookTime: 30,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "100g dark chocolate (chopped)",
      "1/2 cup butter",
      "2 whole eggs plus 2 egg yolks",
      "1/4 cup sugar",
      "2 tbsp all-purpose flour",
      "Powdered sugar for dusting",
      "Fresh raspberries for serving"
    ],
    instructions: [
      "Preheat your oven to 425°F (218°C). Butter and lightly flour four ramekins.",
      "Melt dark chocolate and butter in a heatproof bowl set over simmering water; stir until smooth, then let cool slightly.",
      "In a medium bowl, whisk together whole eggs, egg yolks, and sugar until thick and pale.",
      "Fold the melted chocolate mixture and flour gently into the whipped eggs until just combined.",
      "Divide mixture evenly among the prepared ramekins.",
      "Bake for 12-14 minutes, or until edges are firm but centers still jiggle slightly.",
      "Let cool in ramekins for 1 minute, then gently invert onto plates.",
      "Dust with sweet powdered sugar, garnish with raspberries, and serve instantly while the inside is liquid."
    ],
    nutrition: {
      calories: 450,
      protein: "7g",
      carbs: "38g",
      fat: "31g"
    }
  },
  {
    id: "sample-11",
    title: "Classic Tiramisu",
    mealType: "Dessert",
    difficulty: "Hard",
    cookTime: 45,
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "24 ladyfinger biscuits",
      "1 cup strong espresso coffee (cooled)",
      "3 large eggs (safely pasteurized)",
      "1/3 cup sugar",
      "250g mascarpone cheese",
      "2 tbsp dark rum or coffee liqueur (optional)",
      "Unsweetened cocoa powder for dusting"
    ],
    instructions: [
      "Separate egg yolks from whites in two dry bowls.",
      "Beat egg yolks and sugar until thick, fluffy, and light yellow. Add mascarpone cheese and whisk until smooth.",
      "In the separate bowl, beat egg whites to stiff peaks.",
      "Gently fold egg whites into the creamy mascarpone mixture using a spatula.",
      "Combine cooled espresso and rum/liqueur in a shallow dish.",
      "Quickly dip ladyfinger biscuits one by one into the coffee, and line the bottom of an 8x8 inch dish.",
      "Spread half of the mascarpone cream over the biscuit layer.",
      "Create a second layer of dipped biscuits, and cover with the remaining cream.",
      "Cover and refrigerate for at least 4 hours (overnight is preferred).",
      "Sift cocoa powder generously over the top just before slicing and serving."
    ],
    nutrition: {
      calories: 380,
      protein: "8g",
      carbs: "34g",
      fat: "22g"
    }
  },
  {
    id: "sample-12",
    title: "Trail Mix Energy Balls",
    mealType: "Snack",
    difficulty: "Easy",
    cookTime: 10,
    imageUrl: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&q=80&w=800",
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup organic peanut butter (or almond butter)",
      "1/3 cup honey or maple syrup",
      "1/4 cup mini chocolate chips",
      "1/4 cup pumpkin seeds (pepitas)",
      "1/4 cup dried cranberries (chopped)",
      "1 tsp vanilla extract",
      "A pinch of salt"
    ],
    instructions: [
      "In a large mixing bowl, combine rolled oats, chocolate chips, pumpkin seeds, and chopped cranberries.",
      "Pour in peanut butter, honey, vanilla extract, and salt.",
      "Stir the mixtures thoroughly until the batter holds together evenly.",
      "If the mixture is too wet or dry, adjust slightly with more oats or peanut butter.",
      "Chill the bowl in the refrigerator for 20-30 minutes so it's easier to shape.",
      "Roll into bite-sized balls (about 1 inch in diameter) using your hands.",
      "Store in an airtight container inside the refrigerator for up to 2 weeks."
    ],
    nutrition: {
      calories: 180,
      protein: "5g",
      carbs: "22g",
      fat: "9g"
    }
  }
];
