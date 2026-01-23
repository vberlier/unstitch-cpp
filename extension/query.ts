export const QUERY = `
  (
    (comment) @stitch
    (#match? @stitch "^////")
  )

  (function_definition) @function
  (parameter_list) @parameters

  (_ declarator: [(identifier) (field_identifier)] @declaration)
  (reference_declarator [(identifier) (field_identifier)] @declaration)

  (_ "{" "}") @scope

  (expression/identifier) @reference
  (assignment_expression left: (identifier) @reference)
`
