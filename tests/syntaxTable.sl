class SyntaxTable
  to constructor
    set @table, []
    @push()
  end

  to setContext
    set @context, @table[@table.length - 1]
    <- @
  end

  to push
    @table.push({})
    <- @setContext()
  end

  to pop
    @table.pop()
    <- @setContext()
  end

  to set |k, v|
    set @context[k], v
    <- @
  end

  to get |k|
    <- @context[k]
  end
end

let sb, new SyntaxTable()
sb.set('state', 'This is the first state')
sb.push()
sb.set('state', 'This is the second state')

sb.get('state')
sb.pop()
sb.get('state')
