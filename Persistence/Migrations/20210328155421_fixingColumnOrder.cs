using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class fixingColumnOrder : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    dateOrdered = table.Column<DateTime>(type: "datetime2", nullable: false),
                    piecesOrdered = table.Column<int>(type: "int", nullable: false),
                    orderTotal = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    vin = table.Column<double>(type: "float", nullable: false),
                    organic = table.Column<bool>(type: "bit", nullable: false),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "OrderedItems",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    OrderId = table.Column<int>(type: "int", nullable: true),
                    totalCost = table.Column<double>(type: "float", nullable: false),
                    ordered = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderedItems", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OrderedItems_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_OrderId",
                table: "OrderedItems",
                column: "OrderId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderedItems");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
