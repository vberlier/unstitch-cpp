export const QUERY = `
  (translation_unit (_) @statement)
  (_ "{" (_) @statement "}")
  (_ "{" "}") @scope

  (
    (comment) @stitch
    (#match? @stitch "^////")
  )

  (function_definition) @function
  (parameter_list) @parameters

  (_ declarator: [(identifier) (field_identifier)] @declaration)
  (reference_declarator [(identifier) (field_identifier)] @declaration)

  (expression/identifier) @reference
  (assignment_expression left: (identifier) @reference)
`
