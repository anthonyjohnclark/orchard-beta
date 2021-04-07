using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class fixingOrderItems2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderedItems_Products_ProductId",
                table: "OrderedItems");

            migrationBuilder.DropIndex(
                name: "IX_OrderedItems_ProductId",
                table: "OrderedItems");

            migrationBuilder.CreateTable(
                name: "OrderItemProduct",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    OrderItemsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderItemProduct", x => new { x.ProductId, x.OrderItemsId });
                    table.ForeignKey(
                        name: "FK_OrderItemProduct_OrderedItems_OrderItemsId",
                        column: x => x.OrderItemsId,
                        principalTable: "OrderedItems",
                        principalColumn: "OrderItemsId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_OrderItemProduct_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderItemProduct_OrderItemsId",
                table: "OrderItemProduct",
                column: "OrderItemsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "OrderItemProduct");

            migrationBuilder.CreateIndex(
                name: "IX_OrderedItems_ProductId",
                table: "OrderedItems",
                column: "ProductId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OrderedItems_Products_ProductId",
                table: "OrderedItems",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "ProductId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
