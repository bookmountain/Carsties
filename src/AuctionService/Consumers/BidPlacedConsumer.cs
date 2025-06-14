using AuctionService.Data;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class BidPlacedConsumer : IConsumer<BidPlaced>
{
    private readonly AuctionDbContext _dbContext;

    public BidPlacedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<BidPlaced> context)
    {
        var auction = _dbContext.Auctions.Find(context.Message.AuctionId);
        if (auction == null) throw new MessageException(typeof(BidPlaced), "Auction not found");

        if (auction.CurrentHighBid != null || (context.Message.BidStatus.Contains("Accepted") &&
                                               context.Message.Amount > auction.CurrentHighBid))
        {
            auction.CurrentHighBid = context.Message.Amount;
            await _dbContext.SaveChangesAsync();
        }
    }
}