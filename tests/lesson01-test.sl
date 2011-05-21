class Drawing
  to constructor
    set(
      @gl,       new Slogo()
    )

    @initShaders()
    @initBuffers()

    @gl.clearColor(0.0, 0.0, 0.0, 1.0)
       .enable(@gl.DEPTH_TEST)
    
    @drawScene()
  end

  to initShaders
    let(
      fragShader, @gl.loadShader(@gl, 'shader-fs'),
      vertexShader, @gl.loadShader(gl, 'shader-vs')
    )
    set(@program, @gl.createProgram)
    @gl.attachShader(@program, vertexShader)
       .attachShader(@program, fragShader)
       .linkProgram(@program)
    
    if (not @gl.getProgramParameter(@program, gl.LINK_STATUS)) {
      alert('Could not initialize shaders.')
    }

    @gl.useProgram(@program)
    set(@program.vertexPositionAttribute, @gl.getAttribLocation(@program, 'aVertexPosition'))
    @gl.enableVertexAttribArray(@progam.vertexPositionAttribute)
    set(
      @program.pMatrixUniform, @gl.getUniformLocation(@program, 'uPMatrix'),
      @program.mvMatrixUniform, @gl.getUniformLocation(@program, 'uMVMatrix')
    )
  end

  to initBuffers
    set(@triBuf, @gl.createBuffer())
    @gl.bindBuffer(@gl.ARRAY_BUFFER, @triBuf)

    let(vertices, [
      0.0,  1.0,  0.0,
     -1.0, -1.0,  0.0,
      1.0, -1.0,  0.0
    ])

    @gl.bufferData(@gl.ARRAY_BUFFER, new Float32Array(vertices), @gl.STATIC_DRAW)
    
    set(
      @triBuf.itemSize, 3,
      @triBuf.numItems, 3
      @sqrBuf, @gl.createBuffer()
    )

    @gl.bindBuffer(gl.ARRAY_BUFFER, @sqrBuf)

    set(vertices, [
      1.0,  1.0,  0.0,
     -1.0,  1.0,  0.0,
      1.0, -1.0,  0.0,
     -1.0, -1.0,  0.0
    ])

    @gl.bufferData(@gl.ARRAY_BUFFER, new Float32Array(vertices))

    set(
      @sqrBuf.itemSize, 3,
      @sqrBuf.numItems, 4
    )
  end

  to setMatrixTransforms
    @gl.uniformMatrix4fv(@program.mvMatrixUniform, false, @mvMatrix, @gl.STATIC_DRAW)
       .uniformMatrix4fv(@program.mvMatrixUniform, false, @mvMatrix, @gl.STATIC_DRAW)
  end

  to drawScene
    @gl.resizeTo('css')
       .clear(@gl.COLOR_BUFFER_BIT | @gl.DEPTH_BUFFER_BIT)
    
    mat4.perspective(45, @gl.viewportWidth / @gl.viewportHeight, 0.1, 100.0, @pMatrix)
    
    mat4.identity(@mvMatrix)

    mat4.translate(@mvMatrix, [-1.5, 0.0, -7.0])
    @gl.bindBuffer(@gl.ARRAY_BUFFER, @triBuf)
       .vertexAttribPointer(@program.vertexPositionAttribute, @triBuf.itemSize, @gl.FLOAT, false, 0, 0)
    @setMatrixUniforms()
    @gl.drawArrays(gl.TRIANGLES, 0, @triBuf.numItems)

    mat4.translate(@mvMatrix, [3.0, 0.0, 0.0])
    @gl.bindBuffer(gl.ARRAY_BUFFER, @sqrBuf)
       .vertexAttribPointer(@program.vertexPositionAttribute, @sqrBuf.itemSize, @gl.FLOAT, false, 0, 0)
    @setMatrixUniforms()
    @gl.drawArrays(@gl.TRIANGLE_STRIP, 0, @sqrBuf.numItems)
  end
end

new Drawing()