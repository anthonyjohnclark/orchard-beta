using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class ProductValue : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Values");

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    organic = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    onSale = table.Column<bool>(nullable: false),
                    soldBy = table.Column<string>(nullable: true),
                    caseSize = table.Column<int>(nullable: false),
                    retailPrice = table.Column<int>(nullable: false),
                    sold = table.Column<int>(nullable: false),
                    shrink = table.Column<int>(nullable: false),
                    expectedInv = table.Column<int>(nullable: false),
                    expectedFloor = table.Column<int>(nullable: false),
                    par = table.Column<int>(nullable: false),
                    productActive = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "caseSize", "expectedFloor", "expectedInv", "onSale", "organic", "par", "productActive", "retailPrice", "shrink", "sold", "soldBy" },
                values: new object[] { 1, "suck it once", 0, 0, 0, false, false, 0, false, 0, 0, 0, null });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "caseSize", "expectedFloor", "expectedInv", "onSale", "organic", "par", "productActive", "retailPrice", "shrink", "sold", "soldBy" },
                values: new object[] { 2, "suck it twice", 0, 0, 0, false, false, 0, false, 0, 0, 0, null });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "caseSize", "expectedFloor", "expectedInv", "onSale", "organic", "par", "productActive", "retailPrice", "shrink", "sold", "soldBy" },
                values: new object[] { 3, "suck it thrice", 0, 0, 0, false, false, 0, false, 0, 0, 0, null });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "caseSize", "expectedFloor", "expectedInv", "onSale", "organic", "par", "productActive", "retailPrice", "shrink", "sold", "soldBy" },
                values: new object[] { 4, "suck it four", 0, 0, 0, false, false, 0, false, 0, 0, 0, null });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.CreateTable(
                name: "Values",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Values", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 1, "suck it once" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 2, "suck it twice" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 3, "suck it thrice" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "Id", "Name" },
                values: new object[] { 4, "suck it four" });
        }
    }
}
