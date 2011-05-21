class SyntaxTable
  to constructor
    set @table, []
    @push()
  end

  to push
    let prev, (this.context) ? JSON.parse(JSON.stringify(@context)) : {}
    @table.push(prev)
    <- @_setContext()
  end

  to pop
    @table.pop()
    <- @_setContext()
  end

  to set |k, v|
    set @context[k], v
    <- @
  end

  to get |k|
    <- @context[k]
  end

  to _setContext
    set @context, @table[@table.length - 1]
    <- @
  end
end