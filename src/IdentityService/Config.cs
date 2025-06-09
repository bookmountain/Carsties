using Duende.IdentityServer.Models;

namespace IdentityService;

public static class Config
{
    public static IEnumerable<IdentityResource> IdentityResources =>
    [
        new IdentityResources.OpenId(),
        new IdentityResources.Profile()
    ];

    public static IEnumerable<ApiScope> ApiScopes =>
    [
        new("auctionApp", "Auction app full access")
    ];

    public static IEnumerable<Client> Clients =>
    [
        new()
        {
            ClientId = "postman",
            ClientName = "Postman Client",
            AllowedScopes =
            {
                "auctionApp",
                "openid",
                "profile"
            },
            RedirectUris = { "https://localhost:5001/signin-oidc" },
            ClientSecrets = [new Secret("NotASecret".Sha256())],
            AllowedGrantTypes = { GrantType.ResourceOwnerPassword }
        }
    ];
}