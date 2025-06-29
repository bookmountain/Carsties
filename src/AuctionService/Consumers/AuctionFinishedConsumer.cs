using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers;

public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
{
    private readonly AuctionDbContext _dbContext;

    public AuctionFinishedConsumer(AuctionDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task Consume(ConsumeContext<AuctionFinished> context)
    {
        var auction = await _dbContext.Auctions.FindAsync(Guid.Parse(context.Message.AuctionId));
        if (auction == null) throw new MessageException(typeof(AuctionFinished), "Auction not found");
        if (context.Message.ItemSold)
        {
            auction.Winner = context.Message.Winner;
            auction.Seller = context.Message.Seller;
        }

        auction.Status = auction.SoldAmount > auction.ReservePrice ? Status.Finished : Status.ReserveNotMet;

        await _dbContext.SaveChangesAsync();
    }
}