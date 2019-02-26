// swift-tools-version:4.2
/**
* Copyright IBM Corporation 2017
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
**/

import PackageDescription
import Foundation



let package = Package(
  name: "SwiftMetrics",
  products: [
        .library(
            name: "SwiftMetrics",
            targets: ["SwiftMetrics"]),
    ],
  dependencies: [
    .package(url: "https://github.com/IBM-Swift/Swift-cfenv.git", from: "6.0.0"),
    .package(url: "https://github.com/RuntimeTools/omr-agentcore", .exact("3.2.4-swift4")),
  ],
  targets: [
      .target(name: "SwiftMetrics", dependencies: ["agentcore", "hcapiplugin", "envplugin", "cpuplugin", "memplugin", "CloudFoundryEnv"]),
   ]
)
