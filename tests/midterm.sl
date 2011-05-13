# Slogo 3d Geometry Sample

# In this example you will see how classes are constructed and inherited in Slogo.
# 
# You'll also become familiar with some of the data structures that Slogo uses 
# to store 3D geometry.

# This Cube class will be provided in Javascript form by the `Shapes.Cube` class in
# the Slogo graphics library.
#
#     # Example
#     let cube = new Slogo.Shapes.Cube 100
#
# We're recreating it here to show how Slogo handles 3d Geometry

class Cube
  to constructor |diameter|
    # call the parent class constructor
    super()

    # create a new variable in the local scope
    let radius diameter / 2

    # create a class variable containing the eight vertices for the cube
    set @vertices [
      [-radius,  radius,  radius],
      [ radius,  radius,  radius],
      [ radius, -radius,  radius],
      [-radius, -radius,  radius],
      [-radius,  radius, -radius],
      [ radius,  radius, -radius],
      [ radius, -radius, -radius],
      [-radius, -radius, -radius],
    ]

    # create a class variable containing the six faces that make the cube
    # (references `@vertices` index values)
    set @faces [
      [0, 1, 2, 3],
      [0, 4, 5, 1],
      [1, 5, 6, 2],
      [2, 6, 7, 3],
      [3, 7, 4, 0],
      [4, 5, 6, 7]
    ]
  end
end

# create a new cube with a diameter of 100 units

let cube, new Cube 100

# to drawCube
#   # clear the WebGL drawing space
#   GL.clear()
#   # rotate the cube clockwise 1 degree on the y axis for every tick of the counter
#   cube.rotate 0, 1, 0
#   # draw the cube
#   cube.draw GL
#   # render using default rendering mode and lighting
#   GL.render()
# end

# use jQuery to bind a button element to the `drawCube` function
# if the `#drawCube` is a _continuous_ button then the cube will animate

# $('#drawCube').click drawCube

# resize the WebGL drawing area any time the browser is resized
# reference the CSS width and height values of the element rather than the element attributes.

# $(window).resize to
#   GL.resizeTo 'css'
#   drawCube()
# end
