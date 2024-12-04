import {
  Project,
  InterfaceDeclaration,
  ImportDeclaration,
  PropertySignature,
  TypeAliasDeclaration,
  EnumDeclaration,
  EnumMember,
  ExportDeclaration,
  ExportSpecifier,
  VariableStatement,
  VariableDeclaration,
  ObjectLiteralElementLike,
  Expression,
} from "https://esm.sh/ts-morph@24.0.0";

async function normalizeTypeScriptFile(filePath: string) {
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  const interfaces = sourceFile.getInterfaces();
  const sortedInterfaces = interfaces.sort((a: InterfaceDeclaration, b: InterfaceDeclaration) =>
    a.getName().localeCompare(b.getName())
  );

  sortedInterfaces.forEach((interfaceDecl: InterfaceDeclaration, index: number) => {
    const fullText = interfaceDecl.getFullText();
    sourceFile.insertStatements(index, fullText);
    interfaceDecl.remove();
  });

  sourceFile
    .getImportDeclarations()
    .sort((a: ImportDeclaration, b: ImportDeclaration) => a.getText().localeCompare(b.getText()))
    .forEach((importDecl: ImportDeclaration, index: number) => {
      sourceFile.insertStatements(index, importDecl.getText());
      importDecl.remove();
    });

  sourceFile.getInterfaces().forEach((interfaceDecl: InterfaceDeclaration) => {
    const properties = interfaceDecl.getProperties();

    const sortedProperties = properties.sort((a: PropertySignature, b: PropertySignature) =>
      a.getName().localeCompare(b.getName())
    );

    sortedProperties.forEach((property: PropertySignature) => {
      const typeNode = property.getTypeNode();
      if (typeNode && typeNode.getText().includes("|")) {
        const sortedUnion = typeNode
          .getText()
          .split("|")
          .map((s: string) => s.trim())
          .sort((a: string, b: string) => a.localeCompare(b))
          .join(" | ");
        property.setType(sortedUnion);
      }
    });

    sortedProperties.forEach((property: PropertySignature, index: number) => {
      interfaceDecl.insertProperty(index, {
        name: property.getName(),
        type: property.getTypeNode()?.getText() ?? "",
        hasQuestionToken: property.hasQuestionToken(),
      });
      property.remove();
    });
  });

  sourceFile.getTypeAliases().forEach((typeAlias: TypeAliasDeclaration) => {
    const typeNode = typeAlias.getTypeNode();
    if (typeNode && typeNode.getText().includes("|")) {
      const sortedUnion = typeNode
        .getText()
        .split("|")
        .map((s: string) => s.trim().replace(/"/g, ""))
        .sort((a: string, b: string) => a.localeCompare(b))
        .map((s: string) => `"${s}"`)
        .join(" | ");
      typeAlias.setType(sortedUnion);
    }
  });

  sourceFile.getEnums().forEach((enumDecl: EnumDeclaration) => {
    const members = enumDecl
      .getMembers()
      .sort((a: EnumMember, b: EnumMember) => a.getName().localeCompare(b.getName()));

    members.forEach((member: EnumMember, index: number) => {
      enumDecl.insertMember(index, {
        name: member.getName(),
        initializer: member.getInitializer()?.getText(),
      });
      member.remove();
    });
  });

  sourceFile.getExportDeclarations().forEach((exportDecl: ExportDeclaration) => {
    const namedExports = exportDecl.getNamedExports();
    namedExports
      .sort((a: ExportSpecifier, b: ExportSpecifier) => a.getName().localeCompare(b.getName()))
      .forEach((exportSpecifier: ExportSpecifier, index: number) => {
        exportDecl.insertNamedExport(index, exportSpecifier.getName());
        exportSpecifier.remove();
      });
  });

  sourceFile.getVariableStatements().forEach((variableStatement: VariableStatement) => {
    variableStatement.getDeclarations().forEach((declaration: VariableDeclaration) => {
      const initializer = declaration.getInitializer();
      if (initializer?.getKindName() === "ObjectLiteralExpression") {
        const objLiteral = initializer.asKindOrThrow("ObjectLiteralExpression");
        const sortedProperties = objLiteral
          .getProperties()
          .sort(
            (a: ObjectLiteralElementLike, b: ObjectLiteralElementLike) =>
              a.getName()?.localeCompare(b.getName() || "") || 0
          );

        sortedProperties.forEach((property: ObjectLiteralElementLike, index: number) => {
          objLiteral.insertProperty(index, property.getText());
          property.remove();
        });
      }
    });
  });

  sourceFile.getVariableStatements().forEach((variableStatement: VariableStatement) => {
    variableStatement.getDeclarations().forEach((declaration: VariableDeclaration) => {
      const initializer = declaration.getInitializer();
      if (initializer?.getKindName() === "ArrayLiteralExpression") {
        const arrayLiteral = initializer.asKindOrThrow("ArrayLiteralExpression");
        const sortedElements = arrayLiteral
          .getElements()
          .sort((a: Expression, b: Expression) => a.getText().localeCompare(b.getText()));

        sortedElements.forEach((element: Expression, index: number) => {
          arrayLiteral.insertElement(index, element.getText());
          element.remove();
        });
      }
    });
  });

  await sourceFile.save();
  console.log(`File ${filePath} normalized successfully.`);
}

await normalizeTypeScriptFile(Deno.args[0]);
