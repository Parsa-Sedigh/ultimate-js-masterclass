/* 1-001. project-setup-and-install
Webpack can spin up a local server.

2-002. immutable-vs-mutable-concepts:
immutable vs mutable data.
There are some methods that we can adopt and immutable approach to updating our data structures and this means things such as objects and arrays.

Immutable means sth can not be modified after it's created. Immutability is gonna promote predictable state changes for us and it's gonna
make those irritating hard to find bugs, go away.
For example, JS strings ALREADY have built-in immutability. Because if you for example call slice() on a string, that string wouldn't be
modified and under the hood, JS is spinning up a new string and it doesn't ever mutate the original string.

EX)
let a = 'ok1';
a = 'ok2';
console.log(a); // ok2
So by reassigning some value to a variable, the value of variable changes so reassigning isn't immutable.


let a = 'hello'; // I could define this with const, but I wanted to fully test the immutibility of strings, so instead, I used let.
const b = a.slice(0, 1);
console.log(a, b);

Now, variable a, is still 'hello', although we called slice on it. So strings are immutable in JS.
Immutability is different than reassigning a value to a variable. So reassigning is not immutibility.
With const, we can't reassign sth.

Important: Using const keyword, does not guarantee that thing will be immutable! Because:
EX)
const x = { id: 2 };
x.id = 3;

So now if you console.log() this, you'll see you get a completely different id. The thing we done here is actually mutating our constant(const)
which in this case is an object.
Remember: Only using const, doesn't allow us to reassign. However if that thing is an object, we CAN REASSIGN it(by using x.id and ...) and this
also goes for things such as nested objects. Now how we make this object immutable? Because this is all we have in JS!!!
Sth introduced a few years back, called Object.freeze() . So now if you say:
const x = Object.freeze({id: 2});
x.id = 3;
console.log(x);

In console you'll see an error which says: Cannot assign to read only property 'id' of object '#<Object>'.
So now we're seeing some errors that say we're trying to assign(reassign) a value to an object which is considered frozen which means that it's
readonly.
So what this enables us is to have 100% readonly a frozen object and we can do this for arrays as well.

With let we can reassign but with const we can't reassign it. But simply using const, does NOT guarantee immutibility(we can do x.id = 2 while
x was a const object), which is why we introduced Object.freeze() .

Object.freeze() is not going to freeze any nested object. So it only works with top level objects.

In next lesson we explore some immutable update patterns in JS for dealing with objects and arrays, so we can promote those predictable state
changes and lesser knows hard to find bugs. We're also explore immutable data structures and how they enable us to have a nice performance
enhancement through sth called: an identity comparison.

3-003. immutable-data-structures:
Immutable JS patterns: Understanding how it's more crucial to use immutability with our data structures such as objects and arrays in a
functional programming paradigm. In last vid we looked at using Object.freeze() but in this lesson we're gonna look at mutable and immutable
patterns and compare how they affect an array.

Using push() is obviously still valid today, however the style of JS that we might write might slightly differ. You might be in one app, using
array.push() is a completely valid use case however in an immutable functional paradigm we might want to look at a better approach.

Now let's look at how to add and remove sth from an array in mutable and immutable fashion.
By using .push() to an array, we create a mutation in our data structure or in other words, we mutated that array and added sth to it, by using
prototype.push() . However in a functional paradigm, we want to treat things as immutable. So instead of using array.push() , we need to
construct a new array.

EX) Instead of this(mutable way):
const items = [
    {...}, ...
];
const newItem = {...};
items.push(newItem);

Use this(immutable way of adding an item to end of array):
const newItems = [...items, newItem];
Learn: By using ...<array>, we copy all of the existing items and by saying: const newItems = [...<array>, newItem], we pass in a new item to newItems.
By using an immutable fashion, we're not affecting any data or references elsewhere in a program.(With immutability we get a new copy of sth, each time.)

For removing sth from array(for example removing the first item of array):
mutable way:
const removed = items.splice(0, 1);
console.log(removed, items); // Now items has 2 items inside itself.

immutable way(again, we construct a new array):
Instead of using sth like splice() (which is like push() that mutate arrays), we can construct the updated items.
Now this is going to be done, immutably, by using filter() on the array we want to remove sth from it. Now even though filter() looks similar to
splice() , it's actually a newer array.prototype method which returns us a new array(a new collection). In splice() we used the index of item
we want to delete, but in filter() , we use a callback.

const updatedItems = items.filter((item) => item.id !== 0);
console.log(updatedItems, items);
updatedItems would have n - 1 items but items variable would have STILL n items. Because we have used an immutable operation or in other
words, we immutably updated the items array..

Now let's do these with objects:
We want to ADD a new prop to item object.
EX)
const item = {...};

add a new prop to object - mutable(mutating our initial object):
item.price = 299;

immutable(construct a new object(in this case, the item object)):
Here, we add the price prop to the END of the new object which is itemThatIsNew. By doing this, our initial item object is not being touched at all,
but itemThatIsNew is composed of a brand new object{..item, price: 299}(and I will explain why it's a brand new object which is related to identity)
and we're using spread operator to pass in our EXISTING object which will be copy all of the props of that existing object into the new object and then
we simply add any other further properties(in this case price prop) that we want on the new object as well.

const itemThatIsNew = {...item, price: 299};
console.log(item, itemThatIsNew);

So that was how we can add props to an object immutably(which is done by creating a new object and copying the props of existing object to it).

objects - remove - mutable(by using delete keyword):
Currently we have this object:
EX)
const itemToRemove = {..., price: 299};
console.log(itemToRemove);
delete itemToRemove.price;
console.log(itemToRemove);

So now the price prop doesn't exist anymore on our object.

immutable:
There are a few different ways to do this immutably. We can use destructuring syntax. So here, we want to remove the price prop from itemToRemove
object right?
Learn: When you have: const {<id>} = {id: ..., ...}; , you're asking that object for it's id prop and by doing that, the id prop WON'T wiped out
 from the initial object at all! You just ask for that prop and you get it. So the initial object is not touched at all by using destructuring(so this
 approach is immutable.) But in this case, we want to get ALL OF THE ITEMS of initial object without the prop that we want to remove it. So actually
 we want to copy the initial object without that prop which we don't want it. So here, we write the prop(s) that we don't want to get(copy) from the
 initial object and THEN(at the end), write the name of copied object(in this case, leftOverItems), which is the object that don't have those
 props which means we successfully immutably deleted the props that we didn't want from the initial object and now we have a new object(because of
 immutable approach) which don't have those props from the initial object and initial object isn't touched at all during this process, because
 we're doing in immutable way.
So here, we destructured the price prop and leftOverItems is the object that includes the un destructured props of itemToRemove object.
So with this syntax, we get a brand new object(because of immutable approach) and when you say ...<reference to NOT destructured stuff> in a
destructuring syntax, you can grab the rest items(not destructured items) by using that reference in <>.
const {price, ...leftOverItems} = itemToRemove
console.log(price, itemToRemove, leftOverItems);

The whole reason for adopting immutable approach, is to talk about sth called identity.
Important: Identity means: No objects in JS are the same!
EX) console.log(itemToRemove === itemToRemove); // it doesn't matter what the object is or contains, but it does equal itself.

BUT:
console.log(itemToRemove === leftOverItems); // logs false.
angular or react use identity comparisons to make change detection faster. Because it's a lot easier to say: does this object equal this object?
Yes or no? and if it is no, then we know sth is changed. Because we've immutably changed it elsewhere. If the objects are the same, then we know that
nothing has changed and that's how modern frameworks and JS can be written to improve the performance of your apps.

No object in JS does in fact equal itself(no arrays are the same, no objects are the same, so we know that sth has changed and this quickly can
be evaluated in your apps to give you a nice performance boost when it comes to state management)
ex)
console.log({} = {}); // false
console.log([] = []); // false

Important: When we use the spread operator, we're in fact using a shallow copy and not a deep copy which means that any nested objects will
 still be referenced.

When you use Object.freeze() (which with this, we can't anymore mutate our initial items(objects and arrays))when declaring an array and then
use a mutable approach like array.push() , it would throw error.

When you get: can not add property <>, object is not extensible. It means it can not be changed or mutated. Because that object or array is frozen.
Object.freeze() works on objects and arrays.*/
/* 4-004. imperative-vs-declarative-programming:
impretive is a list of instructions. Imperative approach describes how sth is acheived.
For example instead of using a for loop on an array and do sth, we can use array.prototype.map() which is a declarative approach. The map()
method describes what is happening and it doesn't mutate any state and it's much more readable than for loop(imprative).

ex)
const items = [
{...},
{...}
];

imperative:
const itemNamesImperative = [];
for (let i = 0; i< items.length; i++) {
    const item = items[i];
    itemNamesImperative.push(item.name);
}
console.log(itemNamesImperative);

declarative:
Here, we're not instructing HOW to obtain individual item. But in imperative way, this is exactly what we're doing there(items[i]), not only
we're stepping through the indexes(let i = 0;...) of our array(items array) and then manually incrementing them(i++), we're also having to
calculate how to access each individual item by using the i variable that exists in our for loop. We don't have to do any of that with
declarative, it just does it! Declarative is good with functional style too!
.map() , .filter(), .reduce() are more of a functional style that's brought to JS.
const itemNamesDeclarative = items.map(function(item) {
    return item.name;
});
console.log(itemNamesDeclarative);

Again, imperative is a list of instructions to get to specific address. In imperative we're describing "what" and in declarative we're describing "how"?
map() returns a new array, so we can pass another function.
EX)
const itemsTotalDeclarative = items.map(function(item) {
    return item.name;
}).reduce(function(price, nextPrice) {
    return price + nextPrice;
});

Here, we're chaining the prototype methods because each one returns a new array.
The map() function is declaratively creating a new array for us under the hood and it's a functional style, because map() and reduce() are
pure functions.*/


