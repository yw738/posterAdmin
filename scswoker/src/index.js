export default {
	async fetch(request, env) {
		const url = new URL(request.url);

		// 统一响应函数
		const jsonResponse = (data, status = 200, headers = {}) =>
			new Response(JSON.stringify(data), {
				status,
				headers: {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*', // 可换成指定域名
					'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type,Authorization',
					...headers,
				},
			});

		// 处理预检请求 OPTIONS
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				status: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
					'Access-Control-Allow-Headers': 'Content-Type,Authorization',
				},
			});
		}

		if (url.pathname.startsWith('/api/')) {
			const path = url.pathname.replace('/api/', '');
			const method = request.method;

			// 登录接口
			if (path === 'login' && method === 'POST') {
				const loginData = await request.json();
				const validation = validateLogin(loginData);
				if (!validation.valid) {
					return jsonResponse(
						{
							success: false,
							message: `验证失败: ${validation.errors?.join(', ')}`,
						},
						400
					);
				}
				const result = await login(loginData);
				return jsonResponse(result);
			}

			// sites 列表接口
			if (path === 'sites' && method === 'GET') {
				const { results } = await env.DB.prepare('SELECT * FROM home_set').all();
				return jsonResponse({ data: results, success: true });
			}

			// JWT 验证中间件，除 login 和 sites GET 外都需要验证
			if (!['login', 'sites'].includes(path)) {
				const authHeader = request.headers.get('Authorization');
				if (!authHeader) {
					return jsonResponse({ error: '请先登录' }, 401);
				}
				const [authType, token] = authHeader.split(' ');
				if (authType !== 'Bearer' || !token) {
					return jsonResponse({ error: '无效的认证信息' }, 401);
				}
				const verifyResult = await verifyToken(token);
				if (!verifyResult.valid) {
					return jsonResponse({ error: '认证已过期或无效，请重新登录' }, 401);
				}
			}

			// 更新单条 site
			if (path === 'update' && method === 'POST') {
				const {
					title_cn,
					title_en,
					is_welcome,
					welcome_cn,
					welcome_en = '',
					title_cn_size = '',
					welcome_cn_size = '',
					welcome_en_size,
				} = await request.json();
				await env.DB.prepare(
					`UPDATE home_set SET title_cn = ?, title_en = ?, is_welcome = ?, welcome_cn = ?, welcome_en = ?, title_cn_size = ?, welcome_cn_size = ?, welcome_en_size = ? WHERE id = 1;`
				)
					.bind(title_cn, title_en, is_welcome, welcome_cn, welcome_en, title_cn_size, welcome_cn_size, welcome_en_size)
					.run();
				return jsonResponse({ success: true });
			}
		}

		// 非 API 路由返回 404
		return jsonResponse({ error: 'Not Found' }, 404);
	},
};

// 登录验证函数
function validateLogin(data) {
	const errors = [];
	if (!data.username || typeof data.username !== 'string') errors.push('用户名不能为空且必须是字符串');
	if (!data.password || typeof data.password !== 'string') errors.push('密码不能为空且必须是字符串');
	return { valid: errors.length === 0, errors };
}

// 模拟登录并生成 JWT
async function login(loginRequest) {
	const dto = { username: 'admin', password: 'Aa123456' };
	if (loginRequest.username === dto.username && loginRequest.password === dto.password) {
		const token = await generateToken({ username: loginRequest.username });
		return { success: true, token, message: '登录成功' };
	}
	return { success: false, message: '用户名或密码错误' };
}

// 验证 JWT
async function verifyToken(token) {
	try {
		const [header, payload, signature] = token.split('.');
		if (!header || !payload || !signature) throw new Error('无效Token格式');
		const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
		if (decodedPayload.exp && decodedPayload.exp < Math.floor(Date.now() / 1000)) throw new Error('Token已过期');
		return { valid: true, payload: decodedPayload };
	} catch (error) {
		console.error('Token验证失败:', error);
		return { valid: false };
	}
}

// 生成 JWT
async function generateToken(payload) {
	const expiresIn = 24 * 60 * 60; // 24小时
	const tokenPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + expiresIn, iat: Math.floor(Date.now() / 1000) };
	const header = { alg: 'HS256', typ: 'JWT' };
	const encodedHeader = btoa(JSON.stringify(header)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	const encodedPayload = btoa(JSON.stringify(tokenPayload)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	const signature = btoa('DefaultSecretKey' + encodedHeader + encodedPayload)
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
	return `${encodedHeader}.${encodedPayload}.${signature}`;
}
