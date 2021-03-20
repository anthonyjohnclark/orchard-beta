using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class initialSQLServerMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    organic = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    onSale = table.Column<bool>(type: "bit", nullable: false),
                    soldBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    caseSize = table.Column<int>(type: "int", nullable: false),
                    retailPrice = table.Column<double>(type: "float", nullable: false),
                    sold = table.Column<double>(type: "float", nullable: false),
                    shrink = table.Column<double>(type: "float", nullable: false),
                    expectedInv = table.Column<double>(type: "float", nullable: false),
                    expectedFloor = table.Column<double>(type: "float", nullable: false),
                    par = table.Column<double>(type: "float", nullable: false),
                    productActive = table.Column<bool>(type: "bit", nullable: false),
                    cost = table.Column<double>(type: "float", nullable: false),
                    percentSales = table.Column<double>(type: "float", nullable: false),
                    netGIG = table.Column<double>(type: "float", nullable: false),
                    fill = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
