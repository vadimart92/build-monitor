using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BuildMonitor.Models;
using Microsoft.AspNetCore.Mvc;

namespace BuildMonitor.Controllers
{
	public class SimpleCrudController<TEntity>: ControllerBase where TEntity : class, IEntity
	{
		private readonly ConfigDbContext _dbContext;

		public SimpleCrudController(ConfigDbContext dbContext) {
			_dbContext = dbContext;
		}

		[HttpGet("GetAll")]
		public  IAsyncEnumerable<TEntity> GetAll() {
			return _dbContext.Set<TEntity>().AsAsyncEnumerable();
		}

		[HttpGet("Get")]
		public ValueTask<TEntity> Get([FromQuery]Guid id) {
			return _dbContext.FindAsync<TEntity>(id);
		}
		[HttpDelete]
		public async Task<IActionResult> RemoveProfile([FromQuery]Guid id) {
			var entity = await _dbContext.FindAsync<TEntity>(id);
			if (entity == null) return Ok();
			_dbContext.Set<TEntity>().Remove(entity);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

		[HttpPut]
		public async Task<IActionResult> Save([FromBody]TEntity item) {
			var current = await _dbContext.FindAsync<TEntity>(item.Id);
			var dbSet = _dbContext.Set<TEntity>();
			if (current != null) {
				dbSet.Remove(current);
			}
			await dbSet.AddAsync(item);
			await _dbContext.SaveChangesAsync();
			return Ok();
		}

	}
}
