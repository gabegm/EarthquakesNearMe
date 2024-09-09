"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const earthquake_module_1 = require("./earthquake.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(earthquake_module_1.EarthquakeModule);
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map