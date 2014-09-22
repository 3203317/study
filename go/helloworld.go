package main

import (
	"fmt"
	"runtime"
	"math"
)

var x, y int
var a, b bool
var i, j = true, "false"

type Vertex struct {
	X int
	Y int
}

func main() {
	fmt.Println("Hello World!", runtime.Version(), math.Pi)

	result, _ := add(1, 3)
	fmt.Println(result)

	h, w := swap("Hello", "World")
	fmt.Println(h, w)

	fmt.Println(split(121))

	fmt.Println(x, y, a, b)

	fmt.Println(i, j)

	sum := 0
	for i := 0; i < 10; i++ {
		sum += i
	}
	fmt.Println(sum)

	fmt.Println(pow(5))

	v := Vertex{1, 2}
	fmt.Println(v.X, v.Y)
	v.X = 3
	fmt.Println(v.X)

	v1 := &v
	fmt.Println(v1)
	v1.X = 1e9
	fmt.Println(v)
	fmt.Println(v1)

	fmt.Println()

	vv := new(Vertex)
	fmt.Println(vv)
	vv.X, vv.Y = 11, 9
	fmt.Println(vv)

	fmt.Println()

	m := make(map[string] int)
	m["a"] = 1
	m["b"] = 2
	m["c"] = 3
	fmt.Println(m)

	delete(m, "b")

	v3, ok := m["b"]
	fmt.Println("The value:", v3, "Present?", ok)

	p := []int{2, 3, 5, 7, 11, 13}
	fmt.Println(p)
	fmt.Println(len(p))
	fmt.Println(p[1:6])
	fmt.Println(p[:3])
	fmt.Println(p[4:])
	fmt.Println(cap(p))
	fmt.Println()

	var z []int
	fmt.Println(z, cap(z), len(z))
	fmt.Println()

	fmt.Println(Sqrt(2))


}

func add (x, y int) (int, int) {
	return x + y, 0
}

func swap (x, y string) (string, string) {
	return y, x
}

func split (num int) (x, y int) {
	x = num - 1
	y = num - 2
	return
}

func pow (x int) int {
	if v, _ := add(x, 5); v > 10 {
		return v
	} else {
		fmt.Println("v's value is:", v)
	}
	return 0
}

func Sqrt (x float64) float64 {
}