using System;
using Api.Contexts;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;

namespace Api.Middlewares
{
  public static class ContextMiddleware
  {
    public static IServiceCollection ConfiguraMongoDb(this IServiceCollection services)
    {
      ConventionRegistry.Register("camel case", new ConventionPack
        {
            new CamelCaseElementNameConvention(),
            new IgnoreIfDefaultConvention(true),
            new MemberDefaultValueConvention(typeof(string), null),
            new MemberDefaultValueConvention(typeof(bool), false),
            new MemberDefaultValueConvention(typeof(byte), Convert.ToByte(0)),
            new MemberDefaultValueConvention(typeof(short), Convert.ToInt16(0)),
            new MemberDefaultValueConvention(typeof(int), Convert.ToInt32(0)),
            new MemberDefaultValueConvention(typeof(long), Convert.ToInt64(0)),
            new MemberDefaultValueConvention(typeof(decimal), Convert.ToDecimal(0)),
            new MemberDefaultValueConvention(typeof(double), Convert.ToDouble(0)),
            new MemberDefaultValueConvention(typeof(DateTime), DateTime.MinValue),
            new MemberDefaultValueConvention(typeof(Guid), Guid.Empty),

            new MemberDefaultValueConvention(typeof(bool?), null),
            new MemberDefaultValueConvention(typeof(byte?), null),
            new MemberDefaultValueConvention(typeof(short?), null),
            new MemberDefaultValueConvention(typeof(int?), null),
            new MemberDefaultValueConvention(typeof(long?), null),
            new MemberDefaultValueConvention(typeof(decimal?), null),
            new MemberDefaultValueConvention(typeof(double?), null),
            new MemberDefaultValueConvention(typeof(DateTime?), null),
            new MemberDefaultValueConvention(typeof(Guid?), null),
        }, t => true); ;

      BsonSerializer.RegisterSerializer(DateTimeSerializer.LocalInstance);
      BsonSerializer.RegisterSerializer(typeof(int), new Int32Serializer());
      BsonSerializer.RegisterSerializer(typeof(int?), new NullableSerializer<int>(new Int32Serializer()));
      BsonSerializer.RegisterSerializer(typeof(decimal), new DecimalSerializer(BsonType.Decimal128));
      BsonSerializer.RegisterSerializer(typeof(decimal?), new NullableSerializer<decimal>(new DecimalSerializer(BsonType.Decimal128)));
      BsonSerializer.RegisterSerializer(new GuidSerializer(GuidRepresentation.CSharpLegacy));
      BsonSerializer.RegisterSerializer(typeof(string), new StringSerializer());

      return services;
    }

    public static IServiceCollection AddMongoDbContext<TContext>(this IServiceCollection services, IConfiguration configuration) where TContext : MongoDbContext
    {
      var connectionString = configuration.GetSection("ConnectionStrings").GetValue<string>("MongoDb");
      services.AddSingleton(container =>
      {
        return (TContext)Activator.CreateInstance(typeof(TContext), new MongoDbSettings(connectionString));
      });

      return services;
    }
  }
}
