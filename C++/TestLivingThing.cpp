/*
Michael Smith
COP 2252-C Computer Programming I
OOP6
Last Successful Debug: 11/20/2019
*/

#include<iostream>
using namespace std;

class LivingThing
{
public:
	LivingThing()
	{
		cout << "Constructor of LivingThing class." << endl;
	}
	virtual void grow()
	{
		cout << "Class LivingThing:" << endl;
		cout << "The living thing grows exponentially." << endl;
		cout << endl;
	}
};

class Animal : public LivingThing
{
public:
	Animal()
	{
		cout << "Constructor of Animal class." << endl;
	}

	virtual void eat()
	{
		cout << "Class Animal:" << endl;
		cout << "The animal digests some top-tier cuisine." << endl;
		cout << endl;
	}

	void grow()
	{
		cout << "Class Animal:" << endl;
		cout << "The animal grows big and tall. " << endl;
		cout << endl;
	}
};


class Bird : public Animal
{
public:
	Bird()
	{
		cout << "Constructor of Bird class." << endl;
	}
	void grow()
	{
		cout << "Class Bird:" << endl;
		cout << "The bird grows after consuming a worm." << endl;
		cout << endl;
	}
};

class Fish : public Animal
{
public:
	Fish()
	{
		cout << "Constructor of Fish class." << endl;
	}
};

class Bass : public Fish
{
public:
	Bass()
	{
		cout << "Constructor of Bass class." << endl;
	}
	void eat()
	{
		cout << "Class Bass:" << endl;
		cout << "The bass eats fast. " << endl;
		cout << endl;
	}
};

class Plant : public LivingThing
{
public:
	Plant()
	{
		cout << "Constructor of Plant class." << endl;
	}
	virtual void photosyn()
	{
		cout << "Class Plant:" << endl;
		cout << "The plant uses photosynthesis to create energy." << endl;
		cout << endl;
	}
};

class Grass : public Plant
{
public:
	Grass()
	{
		cout << "Constructor of Grass class." << endl;
	}
};

class Willow : public Grass
{
public:
	Willow()
	{
		cout << "Constructor of Willow class." << endl;
	}
	void photosyn()
	{
		cout << "Class Willow:" << endl;
		cout << "The willow uses photosynthesis to generate energy." << endl;
		cout << endl;
	}
};

class Tree : public Plant
{
public:
	Tree()
	{
		cout << "Constructor of Tree class." << endl;
	}
	void grow()
	{
		cout << "Class Tree:" << endl;
		cout << "The tree is watered sufficiently and grows in the sunlight. " << endl;
		cout << endl;
	}
};

class Pine : public Tree
{
public:
	Pine()
	{
		cout << "Constructor of Pine class." << endl;
	}
};

void display(LivingThing &lv)
{
	lv.grow();
}

int main()
{
	Bird bird1;
	cout << endl;
	Bass bass1;
	cout << endl;
	Willow willow1;
	cout << endl;
	Pine pine1;
	cout << endl;

	bird1.eat();
	bird1.grow();
	display(bird1);

	bass1.eat();
	bass1.grow();
	display(bass1);

	willow1.photosyn();
	willow1.grow();
	display(willow1);

	pine1.photosyn();
	pine1.grow();
	display(pine1);

	system("pause");
}