<%
//
// Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License").
// You may not use this file except in compliance with the License.
// A copy of the License is located at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// or in the "license" file accompanying this file. This file is distributed
// on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
// express or implied. See the License for the specific language governing
// permissions and limitations under the License.

const showFileHeader = (this.options && this.options.hasOwnProperty('showFileHeader')) ? this.options.showFileHeader : true;
if (showFileHeader) {
  var header = '';
  header += "/*\n  DO NOT EDIT DIRECTLY";
  header += "\n  @see src/style-dictionary/variables/";
  header += "\n  Generated on " + new Date().toUTCString();
  header += "\n*/\n";
  print(header);
}

print('\n');

let output = '';
output += allProperties.map(function (prop) {
  let line = '';
  if (prop.comment) {
    line += '  // ' + prop.comment + '\n';
  }
  line += '$' + prop.name + ': ' + (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value)
  return line;
}).join(';\n');
print(output); 
%>
